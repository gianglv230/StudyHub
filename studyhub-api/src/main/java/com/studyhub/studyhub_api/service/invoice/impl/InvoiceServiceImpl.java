package com.studyhub.studyhub_api.service.invoice.impl;

import com.studyhub.studyhub_api.dto.response.invoice.InvoiceCardResponse;
import com.studyhub.studyhub_api.mapper.InvoiceMapper;
import com.studyhub.studyhub_api.model.Invoice;
import com.studyhub.studyhub_api.model.UserAccount;
import com.studyhub.studyhub_api.repository.InvoiceRepository;
import com.studyhub.studyhub_api.service.auth.AuthenticationService;
import com.studyhub.studyhub_api.service.invoice.InvoiceService;
import com.studyhub.studyhub_api.service.user_account.UserAccountService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class InvoiceServiceImpl implements InvoiceService {
    AuthenticationService authService;
    InvoiceRepository invoiceRepository;
    UserAccountService userAccountService;
    InvoiceMapper invoiceMapper;

    @PreAuthorize("hasRole('STUDENT')")
    @Override
    public List<InvoiceCardResponse> getMyStudentInvoice(){
        try {
            UserAccount student = authService.getUserAccountByJwtToken();
            List<Invoice> studentInvoice = invoiceRepository.findByEnrollmentStudentId(student.getId());

            List<Integer> createdByIds = studentInvoice.stream().map(Invoice::getCreatedBy).toList();
            Map<Integer, String> createdByUserMap = userAccountService.getUserAccountMap(createdByIds);

            return studentInvoice.stream()
                    .map(invoice -> invoiceMapper.toInvoiceCardResponse(invoice, createdByUserMap.get(invoice.getId())))
                    .toList();
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }


}
