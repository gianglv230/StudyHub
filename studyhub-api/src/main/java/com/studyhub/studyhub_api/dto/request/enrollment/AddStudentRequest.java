package com.studyhub.studyhub_api.dto.request.enrollment;

import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddStudentRequest extends BaseEnrollmentRequest {
    Integer studentId;
    String classSlug;
//    BigDecimal amount;
//    BigDecimal adjustments;
    String status;
    LocalDate dueDate;
//    String method;
}
