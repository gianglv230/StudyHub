//package com.studyhub.studyhub_api.controller;
//
//import com.studyhub.studyhub_api.dto.response.ApiResponse;
//import com.studyhub.studyhub_api.dto.response.content.ContentResponse;
//import com.studyhub.studyhub_api.service.content.ContentService;
//import io.swagger.v3.oas.annotations.Operation;
//import io.swagger.v3.oas.annotations.tags.Tag;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/content")
//@Tag(name = "Content Controller")
//public class ContentController {
//    private final ContentService contentService;
//
//    @Operation(summary = "Get content", description = "API get content")
//    @GetMapping("/{classSlug}/{classLessonSlug}/content/{contentId}")
//    public ApiResponse<ContentResponse> getContents(@PathVariable String classSlug, @PathVariable String classLessonSlug, @PathVariable Integer contentId) {
//        return ApiResponse.<ContentResponse>builder()
//                .data(contentService.getContent(classSlug, classLessonSlug, contentId))
//                .build();
//    }
//}
