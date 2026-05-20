package com.studyhub.studyhub_api.dto.response.resource;

import java.time.Instant;

public record FileInfoResponse(
        Integer id,
        String resourceName,
        String extension,
        String resourceTye,
        Boolean isPublic,
        Instant createdAt,
        Instant updatedAt
) {
}
