package com.studyhub.studyhub_api.service.class_lesson.impl;

import com.studyhub.studyhub_api.dto.request.class_lesson.ClassLessonTeacherRequest;
import com.studyhub.studyhub_api.dto.response.class_lesson.ClassLessonTeacherResponse;
import com.studyhub.studyhub_api.dto.response.resource.ChildrenResourceResponse;
import com.studyhub.studyhub_api.exception.AppException;
import com.studyhub.studyhub_api.exception.ErrorCode;
import com.studyhub.studyhub_api.mapper.ClassLessonMapper;
import com.studyhub.studyhub_api.mapper.ResourceMapper;
import com.studyhub.studyhub_api.model.*;
import com.studyhub.studyhub_api.model.Class;
import com.studyhub.studyhub_api.repository.ClassLessonConfigRepository;
import com.studyhub.studyhub_api.repository.ClassLessonRepository;
import com.studyhub.studyhub_api.repository.ResourceRepository;
import com.studyhub.studyhub_api.repository.SectionRepository;
import com.studyhub.studyhub_api.service.auth.AuthenticationService;
import com.studyhub.studyhub_api.service.class_lesson.ClassLessonService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ClassLessonServiceImpl implements ClassLessonService {
    AuthenticationService authService;
    ClassLessonRepository classLessonRepository;
    ClassLessonConfigRepository classLessonConfigRepository;

    ClassLessonMapper classLessonMapper;
    ResourceMapper resourceMapper;

    SectionRepository sectionRepository;
    ResourceRepository resourceRepository;
//    ContentRepository contentRepository;

    // Untest
    @PreAuthorize("hasRole('TEACHER')")
    @Override
    public ClassLessonTeacherResponse getClassLessonTeacher(String classLessonSlug) {
        UserAccount account = authService.getUserAccountByJwtToken();
        ClassLesson classLesson = classLessonRepository.findBySlugAndCreatedBy(classLessonSlug, account.getId())
                .orElseThrow(() -> new AppException(ErrorCode.CLASS_LESSON_NOT_EXISTED));

        // 1. Gom tất cả List<Integer> từ các section thành một List<Integer> phẳng duy nhất
        List<Integer> allMaterialIds = classLesson.getSections().stream()
                .map(Section::getMaterials)
                .filter(Objects::nonNull)
                .flatMap(List::stream)
                .distinct() // Tránh tìm kiếm trùng lặp
                .toList();

        // 2. Lấy danh sách Resource từ DB
        List<Resource> resources = resourceRepository.findByIdIn(allMaterialIds);

        // 3. Chuyển đổi List<Resource> sang Map<Integer, ChildrenResourceResponse>
        Map<Integer, ChildrenResourceResponse> resourceMap = resources.stream()
                .collect(Collectors.toMap(
                        Resource::getId,
                        resourceMapper::toChildrenResourceResponse // Hoặc tự tay map new ChildrenResourceResponse(...)
                ));

        // 4. Truyền classLesson kèm theo map tra cứu vào Mapper
        return classLessonMapper.toClassLessonTeacherResponse(classLesson, resourceMap);
    }

    @Transactional
    @Override
    public String addClassLesson(ClassLessonTeacherRequest classLessonTeacherRequest, String classSlug) {
        Class clazz = authService.checkViewClassPermissions(classSlug);
        Long maxOrderIndex = classLessonConfigRepository.getMaxOrderIndexByClassId(clazz.getId());

        ClassLesson classLessonRaw = classLessonMapper.toClassLesson(classLessonTeacherRequest);

        // Trước khi save class lesson, hãy check xem slug đã tồn tại chưa
        boolean isSlugExist = classLessonRepository.existsBySlug(classLessonRaw.getSlug());
        if (isSlugExist) {
            throw new AppException(ErrorCode.SLUG_EXISTED);
        }

        // Save class lesson
        ClassLesson classLesson = ClassLesson.builder()
                .slug(classLessonRaw.getSlug())
                .titleOverride(classLessonRaw.getTitleOverride())
                .isDeleted(false)
                .build();

        classLesson = classLessonRepository.save(classLesson);

        // Save sections
        List<Section> sections = new ArrayList<>();
        for (Section section : classLessonRaw.getSections()) {
            section.setClassLesson(classLesson);
            sections.add(section);
        }
        sectionRepository.saveAll(sections);

        // Save clc
        ClassLessonConfig clc = ClassLessonConfig.builder()
                .classField(clazz)
                .classLesson(classLesson)
                .orderIndex(maxOrderIndex.intValue() + 1)
                .build();

        classLessonConfigRepository.save(clc);

        return classLesson.getSlug();
    }

    @Override
    public Boolean updateClassLesson(ClassLessonTeacherRequest classLessonTeacherRequest, String classSlug) {
        Class clazz = authService.checkViewClassPermissions(classSlug);

        // Save class lesson
        ClassLesson classLesson = classLessonMapper.toClassLesson(classLessonTeacherRequest);
        classLessonRepository.save(classLesson);

        return true;
    }
}
