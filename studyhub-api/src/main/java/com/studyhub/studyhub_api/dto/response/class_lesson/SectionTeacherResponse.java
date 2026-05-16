package com.studyhub.studyhub_api.dto.response.class_lesson;

import java.util.List;

public record SectionTeacherResponse(
        Integer id,
        String sectionName,
        Integer orderIndex,
        List<ContentTeacherResponse> contents
) {
}
