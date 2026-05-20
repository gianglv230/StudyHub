package com.studyhub.studyhub_api.dto.request.resource;

import jakarta.annotation.Nonnull;
import org.springframework.web.multipart.MultipartFile;

public record UploadResourceRequest(
        @Nonnull
        MultipartFile file,
        Integer resourceParentId,
        Integer courseId,
        Integer classId,
        Integer classLessonId,
        Boolean isPublic
) {}
