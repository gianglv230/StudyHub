package com.studyhub.studyhub_api.service.classes;

import com.studyhub.studyhub_api.dto.response.PageResponse;
import com.studyhub.studyhub_api.dto.response.classes.ClassDetailLiteResponse;
import com.studyhub.studyhub_api.dto.response.classes.ClassLessonResponse;
import com.studyhub.studyhub_api.dto.response.classes.ClassLiteResponse;
import com.studyhub.studyhub_api.dto.response.classes.ClassProgressResponse;

import java.util.List;

public interface ClassService {
    PageResponse<ClassLiteResponse> getClassFilter(int page, String subject, String targetGrade, String categoryName);
    List<ClassLiteResponse> getAllClassesOfCourse(String courseSlug);
    PageResponse<ClassLiteResponse> getAllClassesOfTeacher(int page, int teacherId);
    ClassDetailLiteResponse getClassDetailLite(String classSlug);
    List<ClassProgressResponse> getMyStudentClass();
    ClassLessonResponse getClassLesson(String slug);
}
