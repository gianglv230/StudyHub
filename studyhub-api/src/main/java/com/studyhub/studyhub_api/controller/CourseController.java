package com.studyhub.studyhub_api.controller;

import com.studyhub.studyhub_api.dto.request.course.AddCourseRequest;
import com.studyhub.studyhub_api.dto.request.course.CourseFilterRequest;
import com.studyhub.studyhub_api.dto.request.course.UpdateCourseRequest;
import com.studyhub.studyhub_api.dto.response.ApiResponse;
import com.studyhub.studyhub_api.dto.response.PageResponse;
import com.studyhub.studyhub_api.dto.response.course.*;
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
            @RequestParam(value = "title") String title
    ){
        return ApiResponse.<PageResponse<CourseLiteResponse>>builder()
                .data(courseService.findCourseByTitle(page, title))
                .build();
    }

    @Operation(summary = "Get course filter option for guest", description = "API get course filter option for guest")
    @GetMapping("/filter-option")
    public ApiResponse<CourseFilterOptionsResponse> getCourseFilterOptions(){
        return ApiResponse.<CourseFilterOptionsResponse>builder()
                .data(courseService.getCourseFilterOptions())
                .build();
    }

    @Operation(summary = "Get course by filter option for guest", description = "API get course by filter option for guest")
    @GetMapping("/filter")
    public ApiResponse<PageResponse<CourseLiteResponse>> getCourseFilter(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "subject", required = false) String subject,
            @RequestParam(value = "target", required = false) String targetGrade,
            @RequestParam(value = "category", required = false) String  categoryName
    ){
        return ApiResponse.<PageResponse<CourseLiteResponse>>builder()
                .data(courseService.getCourseFilter(page, subject, targetGrade, categoryName))
                .build();
    }

    @Operation(summary = "Get detail course for guest", description = "API get detail course for guest")
    @GetMapping("/detail/{courseSlug}")
    public ApiResponse<CourseDetailLiteResponse> getCourseDetailLite(@PathVariable String courseSlug){
        return ApiResponse.<CourseDetailLiteResponse>builder()
                .data(courseService.getCourseDetailLite(courseSlug))
                .build();
    }

    @Operation(summary = "Filter course for Admin", description = "API filter course for Admin")
    @GetMapping("/admin/filter")
    public ApiResponse<PageResponse<CourseAdminResponse>> filterCourse(
            @ModelAttribute CourseFilterRequest request,
            @RequestParam(defaultValue = "1", required = false) Integer page
    ) {
        return ApiResponse.<PageResponse<CourseAdminResponse>>builder()
                .data(courseService.filterCourse(request, page))
                .build();
    }

    @Operation(summary = "Get course for Admin", description = "API get course for Admin")
    @GetMapping("/admin/{courseSlug}")
    public ApiResponse<AdminCourseResponse> getAdminCourse(
            @PathVariable String courseSlug
    ) {
        return ApiResponse.<AdminCourseResponse>builder()
                .data(courseService.getCourse(courseSlug))
                .build();
    }

    @Operation(summary = "Add course for Admin", description = "API add course for Admin")
    @PostMapping("/admin")
    public ApiResponse<AdminCourseResponse> addCourse(
            @RequestBody AddCourseRequest request
            ) {
        return ApiResponse.<AdminCourseResponse>builder()
                .data(courseService.addCourse(request))
                .build();
    }

    @Operation(summary = "Update course for Admin", description = "API update course for Admin")
    @PutMapping("/admin")
    public ApiResponse<AdminCourseResponse> updateCourse(
            @RequestBody UpdateCourseRequest request
    ) {
        return ApiResponse.<AdminCourseResponse>builder()
                .data(courseService.updateCourse(request))
                .build();
    }

    @Operation(summary = "Delete course", description = "API delete course for Admin")
    @DeleteMapping("/admin/{id}")
    public ApiResponse<Boolean> deleteCourse(
            @PathVariable Integer id
    ) {
        return ApiResponse.<Boolean>builder()
                .data(courseService.deleteCourse(id))
                .build();
    }

}
