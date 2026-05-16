package com.studyhub.studyhub_api.service.invoice;

import com.studyhub.studyhub_api.dto.request.invoice.InvoiceFilterRequest;
import com.studyhub.studyhub_api.dto.request.invoice.UpdateInvoiceRequest;
import com.studyhub.studyhub_api.dto.response.PageResponse;
import com.studyhub.studyhub_api.dto.response.invoice.InvoiceCardResponse;

import java.util.List;

public interface InvoiceService {
    List<InvoiceCardResponse> getMyStudentInvoice();
    PageResponse<InvoiceCardResponse> filterInvoice(InvoiceFilterRequest request, Integer page);
    InvoiceCardResponse updateInvoice(UpdateInvoiceRequest request);
    InvoiceCardResponse findInvoiceById(Integer id);
}
