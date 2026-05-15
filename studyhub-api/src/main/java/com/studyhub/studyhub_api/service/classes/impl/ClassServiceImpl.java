package com.studyhub.studyhub_api.service.classes.impl;

import com.studyhub.studyhub_api.dto.response.PageResponse;
import com.studyhub.studyhub_api.dto.response.classes.*;
import com.studyhub.studyhub_api.enums.Role;
import com.studyhub.studyhub_api.enums.StatusEnrollment;
import com.studyhub.studyhub_api.exception.AppException;
import com.studyhub.studyhub_api.exception.ErrorCode;
import com.studyhub.studyhub_api.model.Class;
import com.studyhub.studyhub_api.mapper.ClassMapper;
import com.studyhub.studyhub_api.model.UserAccount;
import com.studyhub.studyhub_api.repository.ClassRepository;
import com.studyhub.studyhub_api.repository.EnrollmentRepository;
import com.studyhub.studyhub_api.service.auth.AuthenticationService;
import com.studyhub.studyhub_api.service.classes.ClassService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ClassServiceImpl implements ClassService {
    AuthenticationService authService;
    ClassRepository classRepository;
    EnrollmentRepository enrollmentRepository;
    ClassMapper classMapper;
    private static final int MAX_ITEM = 20;

    // Get class by filter
    @Override
    public PageResponse<ClassLiteResponse> getClassFilter(int page, String subject, String targetGrade, String categoryName) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(page - 1, MAX_ITEM, sort);

        var pageData = classRepository.filterClasses(subject, targetGrade, categoryName, pageable);

        return PageResponse.<ClassLiteResponse>builder()
                .currentPage(page)
                .pageSize(pageData.getSize())
                .totalPages(pageData.getTotalPages())
                .totalElements(pageData.getTotalElements())
                .data(pageData.getContent().stream().map(classMapper::toClassLiteResponse).toList())
                .build();
    }

    // Get class of course
    @Override
    public List<ClassLiteResponse> getAllClassesOfCourse(String courseSlug) {
        List<Class> classes = classRepository.getAllClassesOfCourse(courseSlug);
        return classes.stream().map(classMapper::toClassLiteResponse).toList();
    }

    // Get class of teacher
    @Override
    public PageResponse<ClassLiteResponse> getAllClassesOfTeacher(int page, int teacherId) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(page - 1, MAX_ITEM, sort);

        var pageData = classRepository.getAllClassesOfTeacher(teacherId, pageable);

        return PageResponse.<ClassLiteResponse>builder()
                .currentPage(page)
                .pageSize(pageData.getSize())
                .totalPages(pageData.getTotalPages())
                .totalElements(pageData.getTotalElements())
                .data(pageData.getContent().stream().map(classMapper::toClassLiteResponse).toList())
                .build();
    }

    // Get class detail
    @Override
    public ClassDetailLiteResponse getClassDetailLite(String slug) {
        var classDetail = classRepository.getClassDetailBySlug(slug).orElseThrow(
                () -> new AppException(ErrorCode.CLASS_NOT_EXISTED));
        return classMapper.toClassDetailLiteResponse(classDetail);
    }

    // Get class of student
    @PreAuthorize("hasRole('STUDENT')")
    @Override
    public List<ClassProgressResponse> getMyStudentClass() {
        UserAccount userAccount = authService.getUserAccountByJwtToken();
        List<Class> classes = classRepository.getMyStudentClasses(userAccount.getId());
        List<Integer> classIds = classes.stream().map(Class::getId).toList();
        Map<Integer, Integer> progressMap = countLessonOfClass(classIds);
        return classes.stream()
                .map(clazz -> classMapper.toClassProgressResponse(clazz, progressMap.get(clazz.getId())))
                .toList();
    }

    // Count lesson Of classes
    private Map<Integer, Integer> countLessonOfClass(List<Integer> classIds) {
        return classRepository.countLessonByClasses(classIds)
                .stream()
                .collect(Collectors.toMap(
                        ClassLessonCountProjection::getClassId,
                        p -> p.getLessonCount().intValue()
                ));
    }

    // Get class lesson detail
    @Override
    public ClassLessonResponse getClassLesson(String slug) {
        UserAccount account = authService.getUserAccountByJwtToken();

        // Does this student have this class?
        if (account.getRole().equalsIgnoreCase(Role.STUDENT.name())) {
            enrollmentRepository.findByStudentIdAndClassFieldSlugAndStatusEqualsIgnoreCase(account.getId(), slug, StatusEnrollment.ACTIVE.name())
                    .orElseThrow(() -> new AppException(ErrorCode.UNAUTHORIZED));
        }

        Class clazz = classRepository.findClassBySlug(slug).orElseThrow(
                () -> new AppException(ErrorCode.CLASS_NOT_EXISTED)
        );

        // Does this teacher have this class?
        if (account.getRole().equalsIgnoreCase(Role.TEACHER.name())) {
            if (!Objects.equals(clazz.getTeacher().getId(), account.getId())) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }

        // Get lessons of class
        return classMapper.toClassLessonResponse(clazz, clazz.getClassLessonConfigs().size());

    }
}
