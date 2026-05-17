package com.studyhub.studyhub_api.dto.request.classes;

import java.time.LocalDate;

public record ClassFilterRequest(
        String subject,
        String targetGrade,
        String categoryName,
        String status,
        LocalDate fromDate,
        LocalDate toDate,
        String courseName,
        String emptyStatus,
        Integer teacherId,
        String className
) {
}
