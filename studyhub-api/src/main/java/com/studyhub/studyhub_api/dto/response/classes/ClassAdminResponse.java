package com.studyhub.studyhub_api.dto.response.classes;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ClassAdminResponse(
        Integer classId,
        String slug,

        String teacherId,
        String teacherName,

        String subject,
        String targetGrade,
        String categoryName,

        String className,

        String thumbnail,

        LocalDate openingDate,
        LocalDate startDate,
        LocalDate endDate,
        String classSchedule,
        Integer availableSlots,
        BigDecimal price,
        String status,

        LocalDate createdAt,
        String createdBy,
        LocalDate updatedAt,
        String updatedBy
) {
}
