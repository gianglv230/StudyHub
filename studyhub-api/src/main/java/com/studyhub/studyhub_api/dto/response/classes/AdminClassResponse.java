package com.studyhub.studyhub_api.dto.response.classes;

import com.studyhub.studyhub_api.dto.response.content.ResourceResponse;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

public record AdminClassResponse(
        Integer id,
        String slug,

        Integer courseId,
        String courseName,

        String teacherId,
        String teacherName,

        String className,

        ResourceResponse thumbnailOverride,

        LocalDate openingDate,
        LocalDate startDate,
        LocalDate endDate,
        String classSchedule,
        BigDecimal price,
        Integer maxStudents,

        Instant createdAt,
        String createdBy,
        Instant updatedAt,
        String updatedBy
) {
}
