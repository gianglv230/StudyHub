package com.studyhub.studyhub_api.service.classes;

import com.studyhub.studyhub_api.dto.request.classes.AddClassRequest;
import com.studyhub.studyhub_api.dto.request.classes.ClassFilterRequest;
import com.studyhub.studyhub_api.dto.request.classes.UpdateClassRequest;
import com.studyhub.studyhub_api.dto.request.classes.UpdateClassStatusRequest;
import com.studyhub.studyhub_api.dto.response.PageResponse;
import com.studyhub.studyhub_api.dto.response.classes.*;

import java.util.List;

public interface ClassService {
    PageResponse<ClassLiteResponse> getClassFilter(int page, String subject, String targetGrade, String categoryName);
    List<ClassLiteResponse> getAllClassesOfCourse(String courseSlug);
    PageResponse<ClassLiteResponse> getAllClassesOfTeacher(int page, int teacherId);
    ClassDetailLiteResponse getClassDetailLite(String classSlug);
    List<ClassProgressResponse> getMyStudentClass();
    ClassLessonResponse getClassLesson(String slug);

    PageResponse<ClassAdminResponse> filterClass(ClassFilterRequest classFilterRequest, Integer page);

    AdminClassResponse getClass(String classSlug);
    AdminClassResponse addClass(AddClassRequest request);
    AdminClassResponse updateClass(UpdateClassRequest request);
    Boolean deleteClass(Integer classId);

    Boolean openClass(String classSlug);
    Boolean closeClass(String classSlug);
    Boolean updateStatusClass(UpdateClassStatusRequest request);
}
