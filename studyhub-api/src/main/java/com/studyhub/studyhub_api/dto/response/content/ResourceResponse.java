package com.studyhub.studyhub_api.dto.response.content;

public record ResourceResponse(
        Integer resourceId,
        String resourceName,
        String url,
        String path,
        String resourceType
) {
}
