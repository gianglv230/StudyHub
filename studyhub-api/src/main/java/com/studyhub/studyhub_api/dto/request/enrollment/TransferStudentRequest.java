package com.studyhub.studyhub_api.dto.request.enrollment;

import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TransferStudentRequest extends BaseEnrollmentRequest{
    Integer studentId;
    Integer enrollmentId;
    String newClassSlug;
    String status;
    LocalDate dueDate;
}
