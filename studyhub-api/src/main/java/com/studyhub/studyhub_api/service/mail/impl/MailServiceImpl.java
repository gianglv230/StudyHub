package com.studyhub.studyhub_api.service.mail.impl;

import com.studyhub.studyhub_api.dto.response.mail.MailEvent;
import com.studyhub.studyhub_api.mapper.InvoiceMapper;
import com.studyhub.studyhub_api.mapper.InvoiceMapperImpl;
import com.studyhub.studyhub_api.model.Invoice;
import com.studyhub.studyhub_api.repository.InvoiceRepository;
import com.studyhub.studyhub_api.service.invoice.InvoiceService;
import com.studyhub.studyhub_api.service.invoice.impl.InvoiceServiceImpl;
import com.studyhub.studyhub_api.service.mail.MailService;
import com.studyhub.studyhub_api.util.HtmlProvider;
import io.mailtrap.client.MailtrapClient;
import io.mailtrap.model.request.emails.Address;
import io.mailtrap.model.request.emails.MailtrapMail;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor // Tự tạo constructor cho tất cả các biến final
public class MailServiceImpl implements MailService {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    // 1. Inject Service qua constructor (bỏ @Autowired)
    private final InvoiceService invoiceService;
    // 2. Inject HtmlProvider qua constructor
    private final HtmlProvider htmlProvider;
    // 3. Inject cấu hình từ application.properties
    private final MailtrapClient client;       // Tự động inject từ Configuration ở trên
    private final Address supportAddress;     // Tự động inject từ Configuration ở trên

    @Override
    public void sendFeeDeadlineMail() {
        var mails = invoiceService.getAllInvoiceDeadline();
        mails.forEach(this::sendMail);
    }

    @Override
    public void testSendMail() {
        MailEvent mailEvent = new MailEvent("Lưu Văn Giang", "KHOÁ I - CHUYÊN ĐỀ CƠ BẢN MÔN VẬT LÍ NĂM 2027", -1,
                BigDecimal.valueOf(500000), BigDecimal.valueOf(500000),
                BigDecimal.valueOf(0), LocalDate.now(), "giangluuvan230@gmail.com");

        List<MailEvent> mailEvents = List.of(mailEvent);

        mailEvents.forEach(this::sendMail);
    }

    private void sendMail(MailEvent mailEvent) {
        try {
            final MailtrapMail mail = MailtrapMail.builder()
                    .from(supportAddress)
                    .to(List.of(new Address(mailEvent.email())))
                    .subject(String.format("[StudyHub] Nhắc lịch thanh toán học phí lớp: %s - Hạn nộp: %s", mailEvent.className(), mailEvent.dueDate().format(DATE_FORMATTER)))
                    .html(htmlProvider.loadTemplate(mailEvent))
                    .category("Fee Deadline")
                    .build();

            log.info("Send email successfully: {}", client.send(mail));
        } catch (Exception e) {
            log.error("Caught exception:", e);
        }
    }
}
