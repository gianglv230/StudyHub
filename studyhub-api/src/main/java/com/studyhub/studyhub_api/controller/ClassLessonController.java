package com.studyhub.studyhub_api.controller;

import com.studyhub.studyhub_api.dto.request.class_lesson.ClassLessonTeacherRequest;
import com.studyhub.studyhub_api.dto.response.ApiResponse;
import com.studyhub.studyhub_api.dto.response.class_lesson.ClassLessonTeacherResponse;
import com.studyhub.studyhub_api.dto.response.section.LessonSectionResponse;
import com.studyhub.studyhub_api.dto.response.section.SectionResponse;
import com.studyhub.studyhub_api.service.class_lesson.ClassLessonService;
import com.studyhub.studyhub_api.service.section.SectionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/class-lesson")
@Tag(name = "Class Lesson Controller")
public class ClassLessonController {
    private final SectionService sectionService;
    private final ClassLessonService classLessonService;

    // Link hỏng
    @Operation(summary = "Get contents of class lesson by slug", description = "API get contents of class lesson by slug")
    @GetMapping("/{classSlug}/{classLessonSlug}/sections")
    public ApiResponse<LessonSectionResponse> getContents(@PathVariable String classSlug, @PathVariable String classLessonSlug) {
        return ApiResponse.<LessonSectionResponse>builder()
                .data(sectionService.getSectionByClassLessonSlug(classSlug, classLessonSlug))
                .build();
    }

    // Untest
    @Operation(summary = "Get class lesson for teacher to edit", description = "API get class lesson for teacher to edit")
    @GetMapping("/teacher/{classSlug}/{classLessonSlug}")
    public ApiResponse<ClassLessonTeacherResponse> getClassLesson(@PathVariable String classSlug, @PathVariable String classLessonSlug) {
        return ApiResponse.<ClassLessonTeacherResponse>builder()
                .data(classLessonService.getClassLessonTeacher(classLessonSlug))
                .build();
    }

    // Ok
    @Operation(summary = "Add class lesson", description = "API add class lesson")
    @PostMapping("/{classSlug}")
    public ApiResponse<String> addClassLesson(@PathVariable String classSlug, @RequestBody ClassLessonTeacherRequest classLessonTeacherRequest) {
        return ApiResponse.<String>builder()
                .data(classLessonService.addClassLesson(classLessonTeacherRequest, classSlug))
                .build();
    }

    // Untest
    @Operation(summary = "Update class lesson", description = "API add class lesson")
    @PutMapping("/{classSlug}")
    public ApiResponse<String> updateClassLesson(@PathVariable String classSlug, @RequestBody ClassLessonTeacherRequest classLessonTeacherRequest) {
        return ApiResponse.<String>builder()
                .data(classLessonService.updateClassLesson(classLessonTeacherRequest, classSlug))
                .build();
    }
}
