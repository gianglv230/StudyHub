package com.studyhub.studyhub_api.dto.request.class_lesson;

import java.util.List;

public record SectionTeacherRequest(
        Integer id,
        String sectionName,
        String description,

        Integer videoContentId,

        String textContent,
        Integer orderIndex,
        String type,

        List<Integer> materials
) {
}
