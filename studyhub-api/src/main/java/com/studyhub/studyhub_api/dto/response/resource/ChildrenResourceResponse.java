package com.studyhub.studyhub_api.dto.response.resource;

public record ChildrenResourceResponse(
        Integer id,
        String resourceName,
        String url,
        String extension,
        String resourceType
) {
}
