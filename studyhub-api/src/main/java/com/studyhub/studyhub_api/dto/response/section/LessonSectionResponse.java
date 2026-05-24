package com.studyhub.studyhub_api.dto.response.section;

import java.util.List;

public record LessonSectionResponse(
        String classLessonName,
        List<SectionResponse> sections
) {
}
