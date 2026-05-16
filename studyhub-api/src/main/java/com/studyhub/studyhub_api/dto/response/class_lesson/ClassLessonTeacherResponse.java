package com.studyhub.studyhub_api.dto.response.class_lesson;

import java.time.Instant;
import java.util.List;

public record ClassLessonTeacherResponse(
        Integer id,
        String slug,
        String titleOverride,
        Instant createdAt,
        Instant updatedAt,
        List<SectionTeacherResponse> sections
) {
}
