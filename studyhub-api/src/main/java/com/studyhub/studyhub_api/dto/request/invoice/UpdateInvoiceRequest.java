package com.studyhub.studyhub_api.dto.request.invoice;

import java.math.BigDecimal;

public record UpdateInvoiceRequest(
        Integer invoiceId,
        BigDecimal adjustments,
        BigDecimal finalAmount,
        String status,
        String method,
        String type
) {
}
