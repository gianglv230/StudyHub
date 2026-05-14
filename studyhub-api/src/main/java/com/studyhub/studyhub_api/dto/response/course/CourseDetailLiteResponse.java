package com.studyhub.studyhub_api.dto.response.course;

import java.util.List;

public record CourseDetailLiteResponse(
        Integer courseId,
        String slug,
        String title,
        Integer numberOfLessons,
        String subject,
        String targetGrade,
        String categoryName,
        String video,
        String description,
        List<LessonResponse> lessons
) {}
