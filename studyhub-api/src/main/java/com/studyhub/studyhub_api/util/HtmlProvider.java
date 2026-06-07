package com.studyhub.studyhub_api.util;

import com.studyhub.studyhub_api.dto.response.mail.MailEvent;
import org.springframework.stereotype.Component;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Component
public class HtmlProvider {

    private static final String FEE_DEADLINE_TEMPLATE = "fee-deadline";
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public String loadTemplate(MailEvent mailEvent) throws IOException {
        String templatePath = "templates/" + FEE_DEADLINE_TEMPLATE + ".html";
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream(templatePath);

        if (inputStream == null) {
            throw new FileNotFoundException("Template not found: " + templatePath);
        }

        String template = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);

        // Dùng NumberFormat cho Việt Nam
        Locale vietnam = new Locale("vi", "VN");
        NumberFormat vnFormat = NumberFormat.getNumberInstance(vietnam); // KHÔNG dùng getCurrencyInstance
        vnFormat.setGroupingUsed(true);           // bật dấu phân cách hàng nghìn
        vnFormat.setMaximumFractionDigits(2);    // tối đa 2 chữ số thập phân
        vnFormat.setMinimumFractionDigits(0);    // tối thiểu 0 chữ số thập phân

        DateTimeFormatter dfm = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        template = template.replace("{{customerName}}", mailEvent.customerName());
        template = template.replace("{{invoiceId}}", mailEvent.id().toString());
        template = template.replace("{{finalAmount}}", vnFormat.format(mailEvent.finalAmount()));
        template = template.replace("{{className}}", mailEvent.className());
        template = template.replace("{{amount}}", vnFormat.format(mailEvent.amount()));
        template = template.replace("{{adjustments}}", vnFormat.format(mailEvent.adjustments()));
        template = template.replace("{{dueDate}}", mailEvent.dueDate().format(DATE_FORMATTER));
        template = template.replace("{{year}}", LocalDate.now().getYear()+"");

        return template;
    }

}
