package com.studyhub.studyhub_api.dto.response.classes;

import com.studyhub.studyhub_api.dto.response.course.LessonResponse;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record ClassDetailLiteResponse(
        Integer classId,

        Integer courseId,

        Integer numberOfLessons,
        String subject,
        String targetGrade,
        String categoryName,
        String video,
        String description,

        Integer teacherId,
        String teacherName,

        String slug,
        String className,

        LocalDate openingDate,
        LocalDate startDate,
        LocalDate endDate,
        String classSchedule,
        Integer maxStudents,
        Integer availableSlots,
        BigDecimal price
) {
}
