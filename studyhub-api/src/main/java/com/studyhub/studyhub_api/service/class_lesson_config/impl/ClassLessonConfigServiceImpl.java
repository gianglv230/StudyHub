package com.studyhub.studyhub_api.service.class_lesson_config.impl;

import com.studyhub.studyhub_api.dto.request.class_lesson_config.AddClassLessonConfigRequest;
import com.studyhub.studyhub_api.exception.AppException;
import com.studyhub.studyhub_api.exception.ErrorCode;
import com.studyhub.studyhub_api.model.Class;
import com.studyhub.studyhub_api.model.ClassLesson;
import com.studyhub.studyhub_api.model.ClassLessonConfig;
import com.studyhub.studyhub_api.model.UserAccount;
import com.studyhub.studyhub_api.repository.ClassLessonConfigRepository;
import com.studyhub.studyhub_api.repository.ClassLessonRepository;
import com.studyhub.studyhub_api.repository.ClassRepository;
import com.studyhub.studyhub_api.service.auth.AuthenticationService;
import com.studyhub.studyhub_api.service.class_lesson_config.ClassLessonConfigService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ClassLessonConfigServiceImpl implements ClassLessonConfigService {
    AuthenticationService authService;
    //    ClassRepository classRepository;
    ClassLessonRepository classLessonRepository;
    ClassLessonConfigRepository classLessonConfigRepository;

    //classLesson

    @PreAuthorize("hasRole('TEACHER')")
    @Override
    public Boolean deleteClassLessonConfig(Integer classLessonConfigId) {
        UserAccount account = authService.getUserAccountByJwtToken();
        ClassLessonConfig clc = classLessonConfigRepository.findById(classLessonConfigId)
                .orElseThrow(() -> new AppException(ErrorCode.CLASS_LESSON_NOT_EXISTED));

        if(!clc.getClassField().getTeacher().getId().equals(account.getId())) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        Integer classLessonId = clc.getClassLesson().getId();
        Long numberOfClassLesson = classLessonConfigRepository.countClassLessonInClassLessonConfig(classLessonId);
        classLessonConfigRepository.deleteById(classLessonConfigId);

        // If last item, mark class lesson is deleted
        if (numberOfClassLesson.intValue() == 1) {
            ClassLesson classLesson = classLessonRepository.findById(classLessonId)
                    .orElseThrow(() -> new AppException(ErrorCode.CLASS_LESSON_NOT_EXISTED));
            classLesson.setIsDeleted(true);
            classLessonRepository.save(classLesson);
        }

        return true;
    }

    @PreAuthorize("hasRole('TEACHER')")
    @Override
    public Boolean addClassLessonConfig(AddClassLessonConfigRequest addClassLessonConfigRequest) {
        Class clazz = authService.checkViewClassPermissions(addClassLessonConfigRequest.classSlug());
        ClassLesson classLesson = classLessonRepository.findBySlugAndCreatedBy(addClassLessonConfigRequest.classLessonSlug(), clazz.getTeacher().getId())
                .orElseThrow(() -> new AppException(ErrorCode.CLASS_LESSON_NOT_EXISTED));

        ClassLessonConfig clc = ClassLessonConfig.builder()
                .classField(Class.builder().id(clazz.getId()).build())
                .classLesson(ClassLesson.builder().id(classLesson.getId()).build())
                .orderIndex(addClassLessonConfigRequest.orderIndex())
                .build();

        classLessonConfigRepository.save(clc);

        // If this classLesson is restored, class lesson remove deleted
        Long numberOfClass = classLessonConfigRepository.countClassLessonInClassLessonConfig(classLesson.getId());
        if (numberOfClass == 0) {
            classLesson.setIsDeleted(false);
            classLessonRepository.save(classLesson);
        }

        return true;
    }

    @PreAuthorize("hasRole('TEACHER')")
    @Override
    public Boolean updateOrderIndex(Integer classLessonConfigId, Integer orderIndex) {
        UserAccount account = authService.getUserAccountByJwtToken();
        ClassLessonConfig clc = classLessonConfigRepository.findByIdAndClassFieldCreatedBy(classLessonConfigId, account.getId())
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHORIZED));
        clc.setOrderIndex(orderIndex);
        classLessonConfigRepository.save(clc);
        return true;
    }
}
