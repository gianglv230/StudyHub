package com.studyhub.studyhub_api.service.course.impl;

import com.studyhub.studyhub_api.dto.request.course.AddCourseRequest;
import com.studyhub.studyhub_api.dto.request.course.CourseFilterRequest;
import com.studyhub.studyhub_api.dto.request.course.UpdateCourseRequest;
import com.studyhub.studyhub_api.dto.response.PageResponse;
import com.studyhub.studyhub_api.dto.response.classes.ClassAdminResponse;
import com.studyhub.studyhub_api.dto.response.course.*;
import com.studyhub.studyhub_api.enums.CourseType;
import com.studyhub.studyhub_api.exception.AppException;
import com.studyhub.studyhub_api.exception.ErrorCode;
import com.studyhub.studyhub_api.mapper.CourseMapper;
import com.studyhub.studyhub_api.model.Class;
import com.studyhub.studyhub_api.model.Course;
import com.studyhub.studyhub_api.model.Lesson;
import com.studyhub.studyhub_api.repository.ClassRepository;
import com.studyhub.studyhub_api.repository.CourseRepository;
import com.studyhub.studyhub_api.repository.specification.ClassSpecification;
import com.studyhub.studyhub_api.repository.specification.CourseSpecification;
import com.studyhub.studyhub_api.service.course.CourseService;
import com.studyhub.studyhub_api.service.user_account.UserAccountService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class CourseServiceImpl implements CourseService {
    CourseRepository courseRepository;
    ClassRepository classRepository;
    CourseMapper courseMapper;
    UserAccountService userAccountService;
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

        return new CourseFilterOptionsResponse(subjects, targetGrades, categoryNames);
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

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public PageResponse<CourseAdminResponse> filterCourse(CourseFilterRequest courseFilterRequest, Integer page) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(page - 1, MAX_ITEM, sort);

        Specification<Course> spec = CourseSpecification.filter(courseFilterRequest);
        var pageData = courseRepository.findAll(spec, pageable);

        var userIds = Stream.concat(
                pageData.stream().map(Course::getCreatedBy),
                pageData.stream().map(Course::getUpdatedBy)
        ).distinct().toList();

        Map<Integer, String> userMap = userAccountService.getUserAccountMap(userIds);

        return PageResponse.<CourseAdminResponse>builder()
                .currentPage(page)
                .pageSize(pageData.getSize())
                .totalPages(pageData.getTotalPages())
                .totalElements(pageData.getTotalElements())
                .data(pageData.stream()
                        .map(course -> courseMapper
                                .toCourseAdminResponse(course, userMap.get(course.getCreatedBy()), userMap.get(course.getUpdatedBy())))
                        .toList())
                .build();
    }

    private AdminCourseResponse toAdminCourseResponse(Course course) {
        var createdById = course.getCreatedBy();
        var updatedById = course.getUpdatedBy();
        List<Integer> ids = new ArrayList<>();
        if (createdById != null) {
            ids.add(createdById);
        }
        if (updatedById != null) {
            ids.add(updatedById);
        }
        var userMap = userAccountService.getUserAccountMap(ids);
        return courseMapper.toAdminCourseResponse(course, userMap.getOrDefault(createdById, null), userMap.getOrDefault(updatedById, null));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public AdminCourseResponse getCourse(String courseSlug) {
        Course course = courseRepository.findBySlug(courseSlug).orElseThrow(
                () -> new AppException(ErrorCode.COURSE_NOT_EXISTED)
        );
        return this.toAdminCourseResponse(course);
    }

    @Transactional
    @PreAuthorize("hasAnyRole('ADMIN')")
    @Override
    public AdminCourseResponse addCourse(AddCourseRequest request) {
        if (courseRepository.existsBySlug(request.getSlug())) {
            throw new AppException(ErrorCode.SLUG_EXISTED);
        }

        Course course = courseMapper.toCourse(request);
        for (Lesson lesson : course.getLessons()) {
            lesson.setCourse(course);
        }
        courseRepository.save(course);
        return this.toAdminCourseResponse(course);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public AdminCourseResponse updateCourse(UpdateCourseRequest request) {
        Course course = courseRepository.findById(request.getId()).orElseThrow(
                () -> new AppException(ErrorCode.COURSE_NOT_EXISTED)
        );
        courseMapper.updateCourse(request, course);
        course.getLessons().forEach(lesson -> lesson.setCourse(course));
        courseRepository.save(course);
        return this.toAdminCourseResponse(course);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public Boolean deleteCourse(Integer courseId) {
        Course course = courseRepository.findById(courseId).orElseThrow(
                () -> new AppException(ErrorCode.COURSE_NOT_EXISTED)
        );

        if (classRepository.existsByCourseId(courseId)) {
            throw new AppException(ErrorCode.CAN_NOT_DELETE);
        }

        courseRepository.delete(course);
        return true;
    }

}
