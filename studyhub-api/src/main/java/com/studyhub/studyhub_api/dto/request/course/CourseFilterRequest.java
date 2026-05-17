package com.studyhub.studyhub_api.dto.request.course;

import java.time.LocalDate;

public record CourseFilterRequest(
        String subject,
        String targetGrade,
        String categoryName,
        String status,
        LocalDate fromDate,
        LocalDate toDate,
        String courseName
) {
}
