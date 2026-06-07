package com.studyhub.studyhub_api.service.invoice.impl;

import com.studyhub.studyhub_api.dto.request.invoice.InvoiceFilterRequest;
import com.studyhub.studyhub_api.dto.request.invoice.UpdateInvoiceRequest;
import com.studyhub.studyhub_api.dto.response.PageResponse;
import com.studyhub.studyhub_api.dto.response.invoice.InvoiceCardResponse;
import com.studyhub.studyhub_api.dto.response.mail.MailEvent;
import com.studyhub.studyhub_api.enums.MethodInvoice;
import com.studyhub.studyhub_api.enums.StatusInvoice;
import com.studyhub.studyhub_api.exception.AppException;
import com.studyhub.studyhub_api.exception.ErrorCode;
import com.studyhub.studyhub_api.mapper.InvoiceMapper;
import com.studyhub.studyhub_api.model.Invoice;
import com.studyhub.studyhub_api.model.UserAccount;
import com.studyhub.studyhub_api.repository.InvoiceRepository;
import com.studyhub.studyhub_api.repository.UserAccountRepository;
import com.studyhub.studyhub_api.repository.specification.InvoiceSpecification;
import com.studyhub.studyhub_api.service.auth.AuthenticationService;
import com.studyhub.studyhub_api.service.invoice.InvoiceService;
import com.studyhub.studyhub_api.service.user_account.UserAccountService;
import com.studyhub.studyhub_api.type.CreatePaymentLinkCustomRequest;
import com.studyhub.studyhub_api.type.PaymentSessionDto;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class InvoiceServiceImpl implements InvoiceService {
    private static final int MAX_ITEM = 20;
    static String REDIS_PREFIX = "invoice_payment:";
    static String REDIS_PREFIX_REVERT = "ordercode_to_invoice:";
    static List<String> UNPAID_STATUS = List.of(StatusInvoice.PENDING.name(), StatusInvoice.OVERDUE.name());
    AuthenticationService authService;
    InvoiceRepository invoiceRepository;
    UserAccountRepository userAccountRepository;
    UserAccountService userAccountService;
    InvoiceMapper invoiceMapper;
    RedisTemplate<String, Object> redisTemplate;

    final Duration EXPIRED_INVOICE_REDIS = Duration.ofMinutes(10);

    @NonFinal
    @Value("${payos.url-return}")
    String URL_RETURN;

    @PreAuthorize("hasRole('STUDENT')")
    @Override
    public List<InvoiceCardResponse> getMyStudentInvoice() {
        UserAccount student = authService.getUserAccountByJwtToken();
        List<Invoice> studentInvoice = invoiceRepository.findByEnrollmentStudentId(student.getId());

        List<Integer> createdByIds = studentInvoice.stream().map(Invoice::getCreatedBy).toList();
        Map<Integer, String> createdByUserMap = userAccountService.getUserAccountMap(createdByIds);

        return studentInvoice.stream()
                .map(invoice -> invoiceMapper.toInvoiceCardResponse(invoice, createdByUserMap.get(invoice.getId())))
                .toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public PageResponse<InvoiceCardResponse> filterInvoice(InvoiceFilterRequest request, Integer page) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(page - 1, MAX_ITEM, sort);

        Specification<Invoice> spec = InvoiceSpecification.filter(request);
        var pageData = invoiceRepository.findAll(spec, pageable);

        var createdByIds = pageData.stream().map(Invoice::getCreatedBy).toList();
        Map<Integer, String> createdByUserMap = userAccountService.getUserAccountMap(createdByIds);

        return PageResponse.<InvoiceCardResponse>builder()
                .currentPage(page)
                .pageSize(pageData.getSize())
                .totalPages(pageData.getTotalPages())
                .totalElements(pageData.getTotalElements())
                .data(pageData.getContent().stream().map(invoice -> invoiceMapper.toInvoiceCardResponse(invoice, createdByUserMap.get(invoice.getId()))).toList())
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public InvoiceCardResponse updateInvoice(UpdateInvoiceRequest request) {
        Invoice invoice = invoiceRepository.findById(request.invoiceId())
                .orElseThrow(() -> new AppException(ErrorCode.INVOICE_NOT_EXISTED));
        invoiceMapper.updateInvoice(request, invoice);
        invoiceRepository.save(invoice);

        UserAccount account = userAccountRepository.findById(invoice.getCreatedBy())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return invoiceMapper.toInvoiceCardResponse(invoice, account.getFullname());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public InvoiceCardResponse findInvoiceById(Integer id) {
        Invoice invoice = invoiceRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.INVOICE_NOT_EXISTED)
        );
        UserAccount account = userAccountRepository.findById(invoice.getCreatedBy())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return invoiceMapper.toInvoiceCardResponse(invoice, account.getFullname());
    }

    @Override
    public List<MailEvent> getAllInvoiceDeadline() {
        List<Invoice> invoices = invoiceRepository.findByDueDateAndStatusEqualsIgnoreCase(LocalDate.now().plusDays(2), StatusInvoice.PENDING.name());

        return invoices.stream()
                .map(invoiceMapper::toMailEvent)
                .toList();
    }

    @Override
    public void overDueInvoice() {
        List<Invoice> invoices = invoiceRepository.findByDueDateAndStatusEqualsIgnoreCase(LocalDate.now().minusDays(1), StatusInvoice.PENDING.name());
        for (Invoice invoice : invoices) {
            invoice.setStatus(StatusInvoice.OVERDUE.name());
        }
        invoiceRepository.saveAll(invoices);
    }

    /**
     * Lưu Redis chặn thanh toán 2 lần cho 1 invoice chưa hết hạn mã thanh toán
     * <p>
     * 1. Check DB xem hóa đơn có tồn tại và chưa thanh toán chưa. Nếu có thì ném lỗi
     * 2. Đọc dữ liệu từ Redis
     * Nếu có thì ném lỗi
     * Không thì lưu vào redis (Hết hạn trong 10 phút) và tiếp tục
     *
     * @param invoiceId - Mã hóa đơn
     * @param orderCode - Mã thanh toán
     * @param expiredAt - Thời gian hết hạn của mã thanh toán (5 phút)
     */
    @Override
    public CreatePaymentLinkCustomRequest preparePayInvoice(Integer invoiceId, Long orderCode, Long expiredAt) {
        // 1. Check DB xem hóa đơn có tồn tại và chưa thanh toán chưa. Nếu có thì ném lỗi
        Invoice invoice = invoiceRepository.findByIdAndStatusIn(invoiceId, UNPAID_STATUS)
                .orElseThrow(() -> new AppException(ErrorCode.INVOICE_NOT_EXISTED));

        // 2. Đọc dữ liệu từ Redis: Nếu có thì ném lỗi
        String redisKey = REDIS_PREFIX + invoiceId;
        PaymentSessionDto session = (PaymentSessionDto) redisTemplate.opsForValue().get(redisKey);
        if (session != null) {
            throw new AppException(ErrorCode.PAYMENT_LINK_ALREADY_EXISTS);
        }

        var newSession = PaymentSessionDto.builder()
                .orderCode(orderCode)
                .expiredAt(expiredAt)
                .build();

        redisTemplate.opsForValue().set(redisKey, newSession, EXPIRED_INVOICE_REDIS);
        redisTemplate.opsForValue().set(REDIS_PREFIX_REVERT + orderCode, invoiceId, EXPIRED_INVOICE_REDIS);

        return CreatePaymentLinkCustomRequest.builder()
                .id(invoiceId)
                .productName(invoice.getEnrollment().getClassField().getClassName())
                .description("SH" + invoiceId)
                .price(invoice.getFinalAmount().intValue())
                .returnUrl(URL_RETURN)
                .cancelUrl(URL_RETURN)
                .build();
    }

    // Thanh toán invoice
    @Override
    public void payInvoice(Long orderCode) {
        // Lấy invoiceId từ OrderCode
        Integer invoiceId = (Integer) redisTemplate.opsForValue().get(REDIS_PREFIX_REVERT + orderCode);

        if (invoiceId == null) {
            return;
        }

        // Lấy invoice từ DB
        Invoice invoice = invoiceRepository.findByIdAndStatusIn(invoiceId, UNPAID_STATUS)
                .orElse(null);

        if (invoice == null) {
            return;
        }

        invoice.setOrderCode(orderCode.intValue());
        invoice.setStatus(StatusInvoice.PAID.name());
        invoice.setPaidAt(Instant.now());
        invoice.setMethod(MethodInvoice.BANK.name());

        invoiceRepository.save(invoice);
    }

}
