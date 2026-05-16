package com.studyhub.studyhub_api.controller;

import com.studyhub.studyhub_api.dto.request.invoice.InvoiceFilterRequest;
import com.studyhub.studyhub_api.dto.request.invoice.UpdateInvoiceRequest;
import com.studyhub.studyhub_api.dto.response.ApiResponse;
import com.studyhub.studyhub_api.dto.response.PageResponse;
import com.studyhub.studyhub_api.dto.response.invoice.InvoiceCardResponse;
import com.studyhub.studyhub_api.service.invoice.InvoiceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/invoice")
@Tag(name = "Invoice Controller")
public class InvoiceController {
    private final InvoiceService invoiceService;

    @Operation(summary = "Get my invoice for student", description = "API get my invoice for student")
    @GetMapping("/student/my-invoice")
    public ApiResponse<List<InvoiceCardResponse>> getMyInvoice(){
        return ApiResponse.<List<InvoiceCardResponse>>builder()
                .data(invoiceService.getMyStudentInvoice())
                .build();
    }

    @Operation(summary = "Filter invoice", description = "API filter invoice")
    @GetMapping("/filter")
    public ApiResponse<PageResponse<InvoiceCardResponse>> getFilteredInvoice(
            @ModelAttribute InvoiceFilterRequest filter,
            @RequestParam(defaultValue = "1", required = false) Integer page
            ){
        return ApiResponse.<PageResponse<InvoiceCardResponse>>builder()
                .data(invoiceService.filterInvoice(filter, page))
                .build();
    }

    @Operation(summary = "Get invoice detail", description = "API get invoice detail")
    @GetMapping("/detail/{invoiceId}")
    public ApiResponse<InvoiceCardResponse> getInvoiceDetail(@PathVariable Integer invoiceId){
        return ApiResponse.<InvoiceCardResponse>builder()
                .data(invoiceService.findInvoiceById(invoiceId))
                .build();
    }

    @Operation(summary = "Update invoice", description = "API update invoice")
    @PutMapping()
    public ApiResponse<InvoiceCardResponse> updateInvoice(
            @RequestBody UpdateInvoiceRequest updateInvoiceRequest
    ){
        return ApiResponse.<InvoiceCardResponse>builder()
                .data(invoiceService.updateInvoice(updateInvoiceRequest))
                .build();
    }
}
