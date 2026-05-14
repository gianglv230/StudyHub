package com.studyhub.studyhub_api.dto.response.course;

public record LessonResponse(
        Integer lessonId,
        String title,
        Integer orderIndex
) {
}
