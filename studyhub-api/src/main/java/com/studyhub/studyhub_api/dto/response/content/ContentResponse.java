package com.studyhub.studyhub_api.dto.response.content;

import java.util.List;

public record ContentResponse(
        String contentName,
        String description,
        String video,
        String textContent,
        String type,
        List<ResourceResponse> resources
) {}
