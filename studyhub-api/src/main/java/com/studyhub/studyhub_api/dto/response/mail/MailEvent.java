package com.studyhub.studyhub_api.dto.response.mail;

import java.math.BigDecimal;
import java.time.LocalDate;

public record MailEvent(
        String customerName,
        String className,
        Integer id,
        BigDecimal finalAmount,
        BigDecimal amount,
        BigDecimal adjustments,
        LocalDate dueDate,
        String email
) {}
