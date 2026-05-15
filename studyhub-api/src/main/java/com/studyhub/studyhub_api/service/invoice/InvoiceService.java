package com.studyhub.studyhub_api.service.invoice;

import com.studyhub.studyhub_api.dto.response.invoice.InvoiceCardResponse;

import java.util.List;

public interface InvoiceService {
    List<InvoiceCardResponse> getMyStudentInvoice();
}
