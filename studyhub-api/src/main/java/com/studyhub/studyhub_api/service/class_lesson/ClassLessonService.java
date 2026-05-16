package com.studyhub.studyhub_api.service.class_lesson;

import com.studyhub.studyhub_api.dto.request.class_lesson.ClassLessonTeacherRequest;
import com.studyhub.studyhub_api.dto.response.class_lesson.ClassLessonTeacherResponse;

public interface ClassLessonService {
    ClassLessonTeacherResponse getClassLessonTeacher(String classLessonSlug);
    Boolean addClassLesson(ClassLessonTeacherRequest classLessonTeacherRequest, String classSlug);
    Boolean updateClassLesson(ClassLessonTeacherRequest classLessonTeacherRequest, String classSlug);
}
