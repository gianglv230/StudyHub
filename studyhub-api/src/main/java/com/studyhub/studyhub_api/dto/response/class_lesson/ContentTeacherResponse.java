package com.studyhub.studyhub_api.dto.response.class_lesson;

import java.util.List;

public record ContentTeacherResponse(
        Integer id,
        String contentName,
        String description,
        ResourceTeacherResponse videoContent,
        String textContent,
        Integer orderIndex,
        String type,
        List<MaterialResponse> materials
) {
}
