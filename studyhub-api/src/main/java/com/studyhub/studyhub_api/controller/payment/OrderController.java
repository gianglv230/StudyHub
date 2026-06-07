package com.studyhub.studyhub_api.controller.payment;

import com.studyhub.studyhub_api.dto.response.ApiResponse;
import com.studyhub.studyhub_api.exception.AppException;
import com.studyhub.studyhub_api.exception.ErrorCode;
import com.studyhub.studyhub_api.service.invoice.InvoiceService;
import com.studyhub.studyhub_api.type.CreatePaymentLinkCustomRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import vn.payos.PayOS;
import vn.payos.model.v2.paymentRequests.CreatePaymentLinkRequest;
import vn.payos.model.v2.paymentRequests.CreatePaymentLinkResponse;
import vn.payos.model.v2.paymentRequests.PaymentLinkItem;

@Slf4j
@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {

    private final PayOS payOS;
    private final InvoiceService invoiceService;

//    public OrderController(PayOS payOS, BookingService bookingService) {
//        super();
//        this.payOS = payOS;
//        this.bookingService = bookingService;
//    }

    @GetMapping(path = "/create/{id}")
    public ApiResponse<CreatePaymentLinkResponse> createPaymentLink(
            @PathVariable Integer id
    ) {
//        ObjectMapper objectMapper = new ObjectMapper();
//        ObjectNode response = objectMapper.createObjectNode();
//        log.info("CÓ VÀO CONTROLLER NHÉ");

        // Gen order code
        long orderCode = System.currentTimeMillis() / 1000;

        // Hết hạn sau 5 phút
        final long expiredAt = System.currentTimeMillis() / 1000 + 5 * 60;

        CreatePaymentLinkCustomRequest request = invoiceService.preparePayInvoice(id, orderCode, expiredAt);

        PaymentLinkItem item = PaymentLinkItem.builder()
                .name(request.getProductName())
                .quantity(1)
                .price((long) request.getPrice())
                .build();

        CreatePaymentLinkRequest paymentData = CreatePaymentLinkRequest.builder()
                .orderCode(orderCode)
                .description(request.getDescription())
                .amount((long) request.getPrice())
                .item(item)
                .returnUrl(request.getReturnUrl())
                .cancelUrl(request.getCancelUrl())
                .expiredAt(expiredAt)
                .build();
        try {
            //Set thêm thời gian hết hạn theo giây
            CreatePaymentLinkResponse data = payOS.paymentRequests().create(paymentData);

            // Xử lý cập nhật invoiceId, orderCode và expired
//            invoiceService.updateInvoice()

            return ApiResponse.<CreatePaymentLinkResponse>builder()
                    .data(data)
                    .build();

        } catch (Exception e) {
            e.printStackTrace();
            throw new AppException(ErrorCode.PAYOS_FAIL);
        }
    }
}
