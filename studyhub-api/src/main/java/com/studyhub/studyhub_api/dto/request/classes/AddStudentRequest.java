package com.studyhub.studyhub_api.dto.request.classes;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddStudentRequest {
    Integer studentId;
    BigDecimal amount;
    BigDecimal adjustments;
    BigDecimal finalAmount;
    String status;
    LocalDate dueDate;
}
