package com.studyhub.studyhub_api.dto.response.class_lesson;

import java.time.Instant;

public record ResourceTeacherResponse(
        Integer id,
        String resourceName,
        String url,
        String path,
        String resourceType,
        Instant createdAt,
        Instant updatedAt
) {
}
