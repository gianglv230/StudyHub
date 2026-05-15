package com.studyhub.studyhub_api.dto.response.classes;

import java.util.List;

public record ClassLessonResponse(
        Integer classId,
        String className,
        Integer numberOfLesson,
        String classSchedule,

        String teacherName,
        String thumbnail,

        Integer progressOfClass,
        List<ClassLessonBasicResponse> lessons
) {
}
