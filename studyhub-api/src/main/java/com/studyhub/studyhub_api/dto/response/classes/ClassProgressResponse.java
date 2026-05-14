package com.studyhub.studyhub_api.dto.response.classes;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ClassProgressResponse(
        Integer classId,
        String slug,

        String teacherId,
        String teacherName,

        String subject,
        String targetGrade,
        String categoryName,
        Integer numberOfLessons,

        String className,

        String thumbnail,

        LocalDate openingDate,
        LocalDate startDate,
        LocalDate endDate,
        String status,

        int numberOfStudent,
        Integer progressOfClass
) {
}
