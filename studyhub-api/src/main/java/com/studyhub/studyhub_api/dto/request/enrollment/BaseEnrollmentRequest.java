package com.studyhub.studyhub_api.dto.request.enrollment;

import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BaseEnrollmentRequest {
    BigDecimal amount;
    BigDecimal adjustments;
    String method;
}
