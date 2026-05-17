package com.studyhub.studyhub_api.dto.response.course;

public record AdminLessonResponse(
        Integer id,
        String title,
        Integer orderIndex
) {
}
