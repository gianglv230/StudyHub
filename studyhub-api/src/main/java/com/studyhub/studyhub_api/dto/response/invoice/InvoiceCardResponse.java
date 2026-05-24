package com.studyhub.studyhub_api.dto.response.invoice;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

public record InvoiceCardResponse(
        Integer invoiceId,

        LocalDate dueDate,
        BigDecimal amount,
        BigDecimal adjustments,
        BigDecimal finalAmount,
        Integer orderCode,
        Instant paidAt,
        String method,
        String type,
        Instant createdAt,

        Integer createdBy,
        String createdByUser,
        String className,
        String studentName,

        String status,
        String classSlug
) {}
