package com.studyhub.studyhub_api.dto.response.course;

public record LessonLiteResponse(
        Integer lessonId,
        String title,
        Integer orderIndex
) {
}
