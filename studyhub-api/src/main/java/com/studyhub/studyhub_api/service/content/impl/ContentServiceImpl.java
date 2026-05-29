//package com.studyhub.studyhub_api.service.content.impl;
//
//import com.studyhub.studyhub_api.dto.response.content.ContentResponse;
//import com.studyhub.studyhub_api.exception.AppException;
//import com.studyhub.studyhub_api.exception.ErrorCode;
//import com.studyhub.studyhub_api.mapper.ContentMapper;
//import com.studyhub.studyhub_api.model.ClassLesson;
//import com.studyhub.studyhub_api.model.Content;
//import com.studyhub.studyhub_api.model.Material;
//import com.studyhub.studyhub_api.repository.ClassLessonRepository;
//import com.studyhub.studyhub_api.repository.MaterialRepository;
//import com.studyhub.studyhub_api.service.auth.AuthenticationService;
//import com.studyhub.studyhub_api.service.content.ContentService;
//import lombok.AccessLevel;
//import lombok.RequiredArgsConstructor;
//import lombok.experimental.FieldDefaults;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Objects;
//
//@Service
//@Slf4j
//@RequiredArgsConstructor
//@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
//public class ContentServiceImpl implements ContentService {
//    AuthenticationService authService;
//    MaterialRepository materialRepository;
//    ClassLessonRepository classLessonRepository;
//    ContentMapper contentMapper;
//
//    @Override
//    public ContentResponse getContent(String classSlug, String classLessonSlug, Integer contentId) {
//        authService.checkViewClassPermissions(classSlug, classLessonSlug);
//        List<Material> materials = materialRepository.findByContentId(contentId);
//
//        // Check content exist in classLesson
//        Content content = materials.getFirst().getContent();
//        ClassLesson classLesson = classLessonRepository.findById(content.getClassLessonId())
//                .orElseThrow(() -> new AppException(ErrorCode.CLASS_LESSON_NOT_EXISTED));
//
//        if(!Objects.equals(contentId, classLesson.getId())){
//            throw new AppException(ErrorCode.UNAUTHORIZED);
//        }
//
//        return contentMapper.toContentResponse(content, materials);
//    }
//}
