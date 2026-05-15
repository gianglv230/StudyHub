package com.studyhub.studyhub_api.controller;

import com.studyhub.studyhub_api.dto.response.ApiResponse;
import com.studyhub.studyhub_api.dto.response.invoice.InvoiceCardResponse;
import com.studyhub.studyhub_api.service.invoice.InvoiceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/invoice")
@Tag(name = "Teacher Controller")
public class InvoiceController {
    private final InvoiceService invoiceService;

    @Operation(summary = "Get my invoice for student", description = "API get my invoice for student")
    @GetMapping("/student/my-invoice")
    public ApiResponse<List<InvoiceCardResponse>> getMyInvoice(){
        return ApiResponse.<List<InvoiceCardResponse>>builder()
                .data(invoiceService.getMyStudentInvoice())
                .build();
    }
}
