package com.studyhub.studyhub_api.dto.response.classes;

import java.time.Instant;

public record ClassLessonBasicResponse(
        //title_override
        String slug,
        String lessonTitle,
        Integer orderIndex,
        Instant createdAt,
        Instant updatedAt
) {
}
