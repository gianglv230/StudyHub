package com.studyhub.studyhub_api.controller.payment;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.studyhub.studyhub_api.service.invoice.InvoiceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.payos.PayOS;
import vn.payos.model.webhooks.WebhookData;

@Slf4j
@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PayOS payOS;
    private final InvoiceService invoiceService;

//  public PaymentController(PayOS payOS) {
//    super();
//    this.payOS = payOS;
//
//  }

    @PostMapping(path = "/payos_transfer_handler")
    public ApiResponse<WebhookData> payosTransferHandler(@RequestBody Object body)
            throws JsonProcessingException, IllegalArgumentException {
        try {
            WebhookData data = payOS.webhooks().verify(body);
            log.info("Data: {}", data);
            invoiceService.payInvoice(data.getOrderCode());
            return ApiResponse.success("Webhook delivered", data);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.error(e.getMessage());
        }
    }

    private record ApiResponse<T>(Integer error, String message, T data) {
        public static <T> ApiResponse<T> success(T data) {
            return new ApiResponse<>(0, "success", data);
        }

        public static <T> ApiResponse<T> success(String message, T data) {
            return new ApiResponse<>(0, message, data);
        }

        public static <T> ApiResponse<T> error(String message) {
            return new ApiResponse<>(-1, message, null);
        }
    }
}
