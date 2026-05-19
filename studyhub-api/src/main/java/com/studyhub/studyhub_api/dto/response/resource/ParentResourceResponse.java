package com.studyhub.studyhub_api.dto.response.resource;

public record ParentResourceResponse(
        Integer id,
        String resourceName,
        ParentResourceResponse parent
) {
}
