package com.studyhub.studyhub_api.service.class_lesson_config;

import com.studyhub.studyhub_api.dto.request.class_lesson_config.AddClassLessonConfigRequest;

public interface ClassLessonConfigService {
    Boolean deleteClassLessonConfig(Integer classLessonConfigId);
    Boolean addClassLessonConfig(AddClassLessonConfigRequest addClassLessonConfigRequest);
    Boolean updateOrderIndex(Integer classLessonConfigId, Integer orderIndex);
}
