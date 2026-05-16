package com.studyhub.studyhub_api.dto.request.class_lesson;

import java.util.List;

public record ClassLessonTeacherRequest(
        Integer id,
        String slug,
        String titleOverride,
        Boolean isDeleted,
        List<SectionTeacherRequest> sections
) {
}
