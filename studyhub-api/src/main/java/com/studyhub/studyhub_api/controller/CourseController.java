package com.studyhub.studyhub_api.controller;

import com.studyhub.studyhub_api.dto.response.ApiResponse;
import com.studyhub.studyhub_api.dto.response.PageResponse;
import com.studyhub.studyhub_api.dto.response.course.CourseLiteProjection;
import com.studyhub.studyhub_api.dto.response.course.CourseLiteResponse;
import com.studyhub.studyhub_api.service.course.CourseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/course")
@Tag(name = "Course Controller")
public class CourseController {
    private final CourseService courseService;

    @Operation(summary = "Get course by type", description = "API get course by type")
    @GetMapping("/type/{type}")
    public ApiResponse<List<CourseLiteProjection>> getCourseByType(@PathVariable String type) {
        return ApiResponse.<List<CourseLiteProjection>>builder().data(courseService.findCourseByType(type)).build();
    }

    @Operation(summary = "Find course by title", description = "API find course by title")
    @GetMapping("/find")
    public ApiResponse<PageResponse<CourseLiteResponse>> findCourseByTitle(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "title", required = true) String title
    ){
        return ApiResponse.<PageResponse<CourseLiteResponse>>builder()
                .data(courseService.findCourseByTitle(page, title))
                .build();
    }
}
