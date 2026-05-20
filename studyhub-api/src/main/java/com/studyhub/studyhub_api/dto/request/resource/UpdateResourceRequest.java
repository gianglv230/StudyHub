package com.studyhub.studyhub_api.dto.request.resource;

import org.springframework.web.multipart.MultipartFile;

public record UpdateResourceRequest(
        Integer id,
        MultipartFile file
) {}
