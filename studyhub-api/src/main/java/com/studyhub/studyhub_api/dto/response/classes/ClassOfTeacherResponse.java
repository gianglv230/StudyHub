package com.studyhub.studyhub_api.dto.response.classes;

import java.util.List;

public record ClassOfTeacherResponse(
        String teacherName,
        List<ClassLiteResponse> classes
) {
}
