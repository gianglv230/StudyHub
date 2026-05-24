package com.studyhub.studyhub_api.service.section;

import com.studyhub.studyhub_api.dto.response.section.LessonSectionResponse;
import com.studyhub.studyhub_api.dto.response.section.SectionResponse;

import java.util.List;

public interface SectionService {
    LessonSectionResponse getSectionByClassLessonSlug(String classSlug, String classLessonSlug);
}
