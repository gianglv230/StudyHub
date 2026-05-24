package com.studyhub.studyhub_api.service.section.impl;

import com.studyhub.studyhub_api.dto.response.section.LessonSectionResponse;
import com.studyhub.studyhub_api.dto.response.section.SectionResponse;
import com.studyhub.studyhub_api.exception.AppException;
import com.studyhub.studyhub_api.exception.ErrorCode;
import com.studyhub.studyhub_api.mapper.SectionMapper;
import com.studyhub.studyhub_api.model.ClassLesson;
import com.studyhub.studyhub_api.model.Section;
import com.studyhub.studyhub_api.repository.ClassLessonRepository;
import com.studyhub.studyhub_api.repository.SectionRepository;
import com.studyhub.studyhub_api.service.auth.AuthenticationService;
import com.studyhub.studyhub_api.service.section.SectionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class SectionServiceImpl implements SectionService {
    AuthenticationService authService;
    ClassLessonRepository classLessonRepository;
    SectionRepository sectionRepository;
    SectionMapper sectionMapper;

    // Get sections for class lesson
    @Override
    public LessonSectionResponse getSectionByClassLessonSlug(String classSlug, String classLessonSlug) {
        authService.checkViewClassPermissions(classSlug, classLessonSlug);
        ClassLesson classLesson = classLessonRepository.findBySlug(classLessonSlug)
                .orElseThrow(() -> new AppException(ErrorCode.CLASS_NOT_EXISTED));
        List<Section> sectionList = sectionRepository.findByClassLessonSlugOrderByOrderIndexAsc(classLessonSlug);
        var sections = sectionList.stream().map(sectionMapper::toSectionResponse).toList();
        return new LessonSectionResponse(classLesson.getTitleOverride(), sections);
    }
}
