package com.studyhub.studyhub_api.dto.request.class_lesson;

import java.util.List;

public record ClassLessonTeacherRequest(
        Integer id,
        String slug,
        String titleOverride,
        Boolean isDeleted,
        List<SectionTeacherRequest> sections
) {
    // Constructor này giúp gán giá trị mặc định cho isDeleted nếu nó bị null
    public ClassLessonTeacherRequest {
        if (isDeleted == null) {
            isDeleted = false;
        }
    }
}
