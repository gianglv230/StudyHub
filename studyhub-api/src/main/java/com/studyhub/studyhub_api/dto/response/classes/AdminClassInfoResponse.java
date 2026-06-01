package com.studyhub.studyhub_api.dto.response.classes;

import com.studyhub.studyhub_api.dto.response.resource.ChildrenResourceResponse;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

public record AdminClassInfoResponse(
        Integer id,
        String slug,

        Integer courseId,
        String courseName,

        Integer teacherId,
        String teacherName,

        String className,
        String status,

        String subject,
        String targetGrade,
        String categoryName,

        LocalDate openingDate,
        LocalDate startDate,
        LocalDate endDate
//        String classSchedule,
//        BigDecimal price,
//        Integer maxStudents
) {
}
