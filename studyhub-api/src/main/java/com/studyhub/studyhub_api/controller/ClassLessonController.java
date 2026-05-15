package com.studyhub.studyhub_api.controller;

import com.studyhub.studyhub_api.dto.response.ApiResponse;
import com.studyhub.studyhub_api.dto.response.section.SectionResponse;
import com.studyhub.studyhub_api.service.section.SectionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/class-lesson")
@Tag(name = "Class Lesson Controller")
public class ClassLessonController {
    private final SectionService sectionService;

    @Operation(summary = "Get contents of class lesson by slug", description = "API get contents of class lesson by slug")
    @GetMapping("/{classSlug}/{classLessonSlug}/sections")
    public ApiResponse<List<SectionResponse>> getContents(@PathVariable String classSlug, @PathVariable String classLessonSlug) {
        return ApiResponse.<List<SectionResponse>>builder()
                .data(sectionService.getSectionByClassLessonSlug(classSlug, classLessonSlug))
                .build();
    }
}
