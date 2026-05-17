package com.studyhub.studyhub_api.dto.request.classes;

import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@SuperBuilder
public class AdminClassBaseRequest {
    String slug;
    Integer teacherId;
    String className;
    Integer thumbnailId;
    LocalDate openingDate;
    LocalDate startDate;
    LocalDate endDate;
    String classSchedule;
    BigDecimal price;
    Integer maxStudents;
}
