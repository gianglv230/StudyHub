package com.studyhub.studyhub_api.dto.request.classes;

public record UpdateClassStatusRequest(
        String classSlug,
        String status
) {
}
