package com.studyhub.studyhub_api.service.class_lesson.impl;

import com.studyhub.studyhub_api.dto.request.class_lesson.ClassLessonTeacherRequest;
import com.studyhub.studyhub_api.dto.response.class_lesson.ClassLessonTeacherResponse;
import com.studyhub.studyhub_api.exception.AppException;
import com.studyhub.studyhub_api.exception.ErrorCode;
import com.studyhub.studyhub_api.mapper.ClassLessonMapper;
import com.studyhub.studyhub_api.model.*;
import com.studyhub.studyhub_api.model.Class;
import com.studyhub.studyhub_api.repository.ClassLessonConfigRepository;
import com.studyhub.studyhub_api.repository.ClassLessonRepository;
import com.studyhub.studyhub_api.repository.ContentRepository;
import com.studyhub.studyhub_api.repository.SectionRepository;
import com.studyhub.studyhub_api.service.auth.AuthenticationService;
import com.studyhub.studyhub_api.service.class_lesson.ClassLessonService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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
    SectionRepository sectionRepository;
    ContentRepository contentRepository;

    // Untest
    @PreAuthorize("hasRole('TEACHER')")
    @Override
    public ClassLessonTeacherResponse getClassLessonTeacher(String classLessonSlug) {
        UserAccount account = authService.getUserAccountByJwtToken();
        ClassLesson classLesson = classLessonRepository.findBySlugAndCreatedBy(classLessonSlug, account.getId())
                .orElseThrow(() -> new AppException(ErrorCode.CLASS_LESSON_NOT_EXISTED));
        return classLessonMapper.toClassLessonTeacherResponse(classLesson);
    }

    @Override
    public String addClassLesson(ClassLessonTeacherRequest classLessonTeacherRequest, String classSlug) {
        Class clazz = authService.checkViewClassPermissions(classSlug);
        Long maxOrderIndex = classLessonConfigRepository.getMaxOrderIndexByClassId(clazz.getId());

        ClassLesson classLessonRaw = classLessonMapper.toClassLesson(classLessonTeacherRequest);

        // Save class lesson
        ClassLesson classLesson = ClassLesson.builder()
                .slug(classLessonRaw.getSlug())
                .titleOverride(classLessonRaw.getTitleOverride())
                .isDeleted(false)
                .build();
        classLesson = classLessonRepository.save(classLesson);

        // Save sections
//        List<Section> sections = new ArrayList<>();
        for (Section section : classLessonRaw.getSections()) {
            Section sectionClone = Section.builder()
                    .classLesson(classLesson)
                    .sectionName(section.getSectionName())
                    .orderIndex(section.getOrderIndex())
                    .build();
            sectionClone = sectionRepository.save(sectionClone);

            List<Content> contents = new ArrayList<>();
            for (Content content : section.getContents()) {
                content.setSection(sectionClone);
                content.setClassLessonId(classLesson.getId());
                contentRepository.save(content);
            }

            contentRepository.saveAll(contents);
        }

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
