package com.studyhub.studyhub_api.service.classes.impl;

import com.studyhub.studyhub_api.dto.response.PageResponse;
import com.studyhub.studyhub_api.dto.response.classes.ClassDetailLiteResponse;
import com.studyhub.studyhub_api.dto.response.classes.ClassLiteResponse;
import com.studyhub.studyhub_api.exception.AppException;
import com.studyhub.studyhub_api.exception.ErrorCode;
import com.studyhub.studyhub_api.model.Class;
import com.studyhub.studyhub_api.mapper.ClassMapper;
import com.studyhub.studyhub_api.repository.ClassRepository;
import com.studyhub.studyhub_api.service.classes.ClassService;
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
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ClassServiceImpl implements ClassService {
    ClassRepository classRepository;
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

    @Override
    public ClassDetailLiteResponse getClassDetailLite(String slug) {
        var classDetail = classRepository.getClassDetailBySlug(slug).orElseThrow(
                () -> new AppException(ErrorCode.CLASS_NOT_EXISTED));
        return classMapper.toClassDetailLiteResponse(classDetail);
    }
}
