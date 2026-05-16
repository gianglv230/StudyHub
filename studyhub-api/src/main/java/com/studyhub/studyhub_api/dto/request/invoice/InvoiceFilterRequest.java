package com.studyhub.studyhub_api.dto.request.invoice;

import java.time.LocalDate;

public record InvoiceFilterRequest(
        Integer invoiceId,
        String status,
        LocalDate dueDate,
        String orderCode,
        Integer studentId,
        Integer classId,
        LocalDate fromDate,
        LocalDate toDate
) {
}
