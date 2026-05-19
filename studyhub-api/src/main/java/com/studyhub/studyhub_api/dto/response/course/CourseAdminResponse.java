package com.studyhub.studyhub_api.dto.response.course;

import java.time.Instant;
import java.time.LocalDate;

// Filter
public record CourseAdminResponse(
        Integer courseId,
        String slug,
        String title,
        Integer numberOfLessons,
        String subject,
        String targetGrade,
        String categoryName,
        String thumbnail,

        String status,

        Instant createdAt,
        String createdBy,
        Instant updatedAt,
        String updatedBy
) {}
