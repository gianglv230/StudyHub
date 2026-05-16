package com.studyhub.studyhub_api.dto.request.class_lesson;

import java.util.List;

public record SectionTeacherRequest(
        Integer id,
        String sectionName,
        Integer orderIndex,
        List<ContentTeacherRequest> contents
) {
}
