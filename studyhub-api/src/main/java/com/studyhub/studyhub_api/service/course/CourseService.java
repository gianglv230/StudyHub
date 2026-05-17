package com.studyhub.studyhub_api.service.course;

import com.studyhub.studyhub_api.dto.request.course.AddCourseRequest;
import com.studyhub.studyhub_api.dto.request.course.CourseFilterRequest;
import com.studyhub.studyhub_api.dto.request.course.UpdateCourseRequest;
import com.studyhub.studyhub_api.dto.response.PageResponse;
import com.studyhub.studyhub_api.dto.response.course.*;

import java.util.List;

public interface CourseService {
    List<CourseLiteProjection> findCourseByType(String type);
    PageResponse<CourseLiteResponse> findCourseByTitle(int page, String title);
    CourseFilterOptionsResponse getCourseFilterOptions();
    PageResponse<CourseLiteResponse> getCourseFilter(int page, String subject, String targetGrade, String categoryName);
    CourseDetailLiteResponse getCourseDetailLite(String courseSlug);

    PageResponse<CourseAdminResponse> filterCourse(CourseFilterRequest courseFilterRequest, Integer page);

    AdminCourseResponse getCourse(String courseSlug);
    AdminCourseResponse addCourse(AddCourseRequest request);
    AdminCourseResponse updateCourse(UpdateCourseRequest request);
    Boolean deleteCourse(Integer courseId);
}
