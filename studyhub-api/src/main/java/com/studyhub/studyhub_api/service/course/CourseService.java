package com.studyhub.studyhub_api.service.course;

import com.studyhub.studyhub_api.dto.response.PageResponse;
import com.studyhub.studyhub_api.dto.response.course.CourseFilterOptionsResponse;
import com.studyhub.studyhub_api.dto.response.course.CourseDetailLiteResponse;
import com.studyhub.studyhub_api.dto.response.course.CourseLiteProjection;
import com.studyhub.studyhub_api.dto.response.course.CourseLiteResponse;

import java.util.List;

public interface CourseService {
    List<CourseLiteProjection> findCourseByType(String type);
    PageResponse<CourseLiteResponse> findCourseByTitle(int page, String title);
    CourseFilterOptionsResponse getCourseFilterOptions();
    PageResponse<CourseLiteResponse> getCourseFilter(int page, String subject, String targetGrade, String categoryName);
    CourseDetailLiteResponse getCourseDetailLite(String courseSlug);
}
