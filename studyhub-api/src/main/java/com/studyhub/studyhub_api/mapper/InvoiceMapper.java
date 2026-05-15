package com.studyhub.studyhub_api.mapper;

import com.studyhub.studyhub_api.dto.response.invoice.InvoiceCardResponse;
import com.studyhub.studyhub_api.model.Invoice;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface InvoiceMapper {
    @Mappings({
            @Mapping(target = "invoiceId", source = "invoice.id"),
            @Mapping(target = "createdByUser", source = "createdByUser"),
            @Mapping(target = "className", source = "invoice.enrollment.classField.className"),
            @Mapping(target = "studentName", source = "invoice.enrollment.student.fullname")
    })
    InvoiceCardResponse toInvoiceCardResponse(Invoice invoice, String createdByUser);
}
