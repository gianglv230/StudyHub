package com.studyhub.studyhub_api.service.invoice.impl;

import com.studyhub.studyhub_api.dto.request.invoice.InvoiceFilterRequest;
import com.studyhub.studyhub_api.dto.request.invoice.UpdateInvoiceRequest;
import com.studyhub.studyhub_api.dto.response.PageResponse;
import com.studyhub.studyhub_api.dto.response.invoice.InvoiceCardResponse;
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
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class InvoiceServiceImpl implements InvoiceService {
    AuthenticationService authService;
    InvoiceRepository invoiceRepository;
    UserAccountRepository userAccountRepository;
    UserAccountService userAccountService;
    InvoiceMapper invoiceMapper;
    private static final int MAX_ITEM = 20;

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
        Pageable pageable = PageRequest.of(page - 1, MAX_ITEM);

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


}
