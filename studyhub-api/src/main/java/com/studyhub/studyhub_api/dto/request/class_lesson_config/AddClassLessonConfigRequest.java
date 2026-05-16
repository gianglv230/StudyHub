package com.studyhub.studyhub_api.dto.request.class_lesson_config;

public record AddClassLessonConfigRequest(
        String classSlug,
        String classLessonSlug,
        Integer orderIndex
) {
}
