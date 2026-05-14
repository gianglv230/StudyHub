package com.studyhub.studyhub_api.service.course;

import com.studyhub.studyhub_api.dto.response.PageResponse;
import com.studyhub.studyhub_api.dto.response.course.CourseLiteProjection;
import com.studyhub.studyhub_api.dto.response.course.CourseLiteResponse;

import java.util.List;

public interface CourseService {
    List<CourseLiteProjection> findCourseByType(String type);
    PageResponse<CourseLiteResponse> findCourseByTitle(int page, String title);
}
