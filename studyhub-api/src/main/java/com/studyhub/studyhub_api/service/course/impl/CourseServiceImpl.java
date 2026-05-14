package com.studyhub.studyhub_api.service.course.impl;

import com.studyhub.studyhub_api.dto.response.PageResponse;
import com.studyhub.studyhub_api.dto.response.course.CourseFilterOptionsResponse;
import com.studyhub.studyhub_api.dto.response.course.CourseDetailLiteResponse;
import com.studyhub.studyhub_api.dto.response.course.CourseLiteProjection;
import com.studyhub.studyhub_api.dto.response.course.CourseLiteResponse;
import com.studyhub.studyhub_api.enums.CourseType;
import com.studyhub.studyhub_api.exception.AppException;
import com.studyhub.studyhub_api.exception.ErrorCode;
import com.studyhub.studyhub_api.mapper.CourseMapper;
import com.studyhub.studyhub_api.repository.CourseRepository;
import com.studyhub.studyhub_api.service.course.CourseService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class CourseServiceImpl implements CourseService {
    CourseRepository courseRepository;
    CourseMapper courseMapper;
    private static final int MAX_ITEM = 20;

    // Find hot course and new course
    @Override
    public List<CourseLiteProjection> findCourseByType(String type) {
        CourseType courseType;

        try {
            courseType = CourseType.valueOf(type.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new AppException(ErrorCode.INVALID_COURSE_TYPE);
        }

        return switch (courseType) {
            case HOT -> courseRepository.findHotCourses();
            case NEW -> courseRepository.findNewCourses();
        };
    }

    // Search course by title
    @Override
    public PageResponse<CourseLiteResponse> findCourseByTitle(int page, String title) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(page - 1, MAX_ITEM, sort);

        var pageData = courseRepository.findCoursesByTitleLike(title, pageable);

        return PageResponse.<CourseLiteResponse>builder()
                .currentPage(page)
                .pageSize(pageData.getSize())
                .totalPages(pageData.getTotalPages())
                .totalElements(pageData.getTotalElements())
                .data(pageData.getContent().stream().map(courseMapper::toCourseLiteResponse).toList())
                .build();
    }

    // Get course filter options
    @Override
    public CourseFilterOptionsResponse getCourseFilterOptions() {
        List<String> subjects = courseRepository.getDistinctSubject();
        List<String> categoryNames = courseRepository.getDistinctCategoryName();
        List<String> targetGrades = courseRepository.getDistinctTargetGrade();

        return new CourseFilterOptionsResponse(subjects, categoryNames, targetGrades);
    }

    // Get course by filter options
    @Override
    public PageResponse<CourseLiteResponse> getCourseFilter(int page, String subject, String targetGrade, String categoryName) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(page - 1, MAX_ITEM, sort);

        var pageData = courseRepository.filterCourses(subject, targetGrade, categoryName, pageable);

        return PageResponse.<CourseLiteResponse>builder()
                .currentPage(page)
                .pageSize(pageData.getSize())
                .totalPages(pageData.getTotalPages())
                .totalElements(pageData.getTotalElements())
                .data(pageData.getContent().stream().map(courseMapper::toCourseLiteResponse).toList())
                .build();
    }

    @Override
    public CourseDetailLiteResponse getCourseDetailLite(String courseSlug) {
        var course = courseRepository.getCourseDetailBySlug(courseSlug.trim()).orElseThrow(
                () -> new AppException(ErrorCode.COURSE_NOT_EXISTED)
        );

        return courseMapper.toCourseLiteDetailResponse(course);
    }

}
