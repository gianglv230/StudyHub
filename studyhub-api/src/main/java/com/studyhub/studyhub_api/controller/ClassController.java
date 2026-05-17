package com.studyhub.studyhub_api.controller;

import com.studyhub.studyhub_api.dto.request.classes.AddClassRequest;
import com.studyhub.studyhub_api.dto.request.classes.ClassFilterRequest;
import com.studyhub.studyhub_api.dto.request.classes.UpdateClassRequest;
import com.studyhub.studyhub_api.dto.request.course.AddCourseRequest;
import com.studyhub.studyhub_api.dto.request.course.UpdateCourseRequest;
import com.studyhub.studyhub_api.dto.response.ApiResponse;
import com.studyhub.studyhub_api.dto.response.PageResponse;
import com.studyhub.studyhub_api.dto.response.classes.*;
import com.studyhub.studyhub_api.dto.response.course.AdminCourseResponse;
import com.studyhub.studyhub_api.service.classes.ClassService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/class")
@Tag(name = "Class Controller")
public class ClassController {
    private final ClassService classService;

    @Operation(summary = "Get classes by filter option for guest", description = "API get classes by filter option for guest")
    @GetMapping("/filter")
    public ApiResponse<PageResponse<ClassLiteResponse>> getClassFilter(@RequestParam(value = "page", required = false, defaultValue = "1") int page, @RequestParam(value = "subject", required = false) String subject, @RequestParam(value = "target", required = false) String targetGrade, @RequestParam(value = "category", required = false) String categoryName) {
        return ApiResponse.<PageResponse<ClassLiteResponse>>builder().data(classService.getClassFilter(page, subject, targetGrade, categoryName)).build();
    }

    @Operation(summary = "Get classes of course", description = "API get classes of course")
    @GetMapping("/class-of-course/{courseSlug}")
    public ApiResponse<List<ClassLiteResponse>> getClassOfCourse(@PathVariable String courseSlug) {
        return ApiResponse.<List<ClassLiteResponse>>builder().data(classService.getAllClassesOfCourse(courseSlug)).build();
    }

    @Operation(summary = "Get classes of teacher", description = "API get classes of teacher")
    @GetMapping("/class-of-teacher/{teacherId}")
    public ApiResponse<PageResponse<ClassLiteResponse>> getClassOfCourse(@RequestParam(value = "page", required = false, defaultValue = "1") int page, @PathVariable int teacherId) {
        return ApiResponse.<PageResponse<ClassLiteResponse>>builder().data(classService.getAllClassesOfTeacher(page, teacherId)).build();
    }

    @Operation(summary = "Get detail class for guest", description = "API get detail class for guest")
    @GetMapping("/detail/{classSlug}")
    public ApiResponse<ClassDetailLiteResponse> getClassDetailLite(@PathVariable String classSlug) {
        return ApiResponse.<ClassDetailLiteResponse>builder()
                .data(classService.getClassDetailLite(classSlug))
                .build();
    }

    @Operation(summary = "Get classes of student", description = "API get classes of student")
    @GetMapping("/student/list")
    public ApiResponse<List<ClassProgressResponse>> getMyStudentClass() {
        return ApiResponse.<List<ClassProgressResponse>>builder()
                .data(classService.getMyStudentClass())
                .build();
    }

    @Operation(summary = "Get class lesson", description = "API get class lesson")
    @GetMapping("/class-lesson/{classSlug}")
    public ApiResponse<ClassLessonResponse> getClassLessonOfClass(@PathVariable String classSlug) {
        return ApiResponse.<ClassLessonResponse>builder()
                .data(classService.getClassLesson(classSlug))
                .build();
    }

    @Operation(summary = "Filter class for Admin", description = "API filter class for Admin")
    @GetMapping("/admin/filter")
    public ApiResponse<PageResponse<ClassAdminResponse>> filterClass(
            @ModelAttribute ClassFilterRequest request,
            @RequestParam(defaultValue = "1", required = false) Integer page
    ) {
        return ApiResponse.<PageResponse<ClassAdminResponse>>builder()
                .data(classService.filterClass(request, page))
                .build();
    }

    @Operation(summary = "Get class for Admin", description = "API get class for Admin")
    @GetMapping("/admin/{classSlug}")
    public ApiResponse<AdminClassResponse> getAdminClass(
            @PathVariable String classSlug
    ) {
        return ApiResponse.<AdminClassResponse>builder()
                .data(classService.getClass(classSlug))
                .build();
    }

    @Operation(summary = "Add class for Admin", description = "API add class for Admin")
    @PostMapping("/admin")
    public ApiResponse<AdminClassResponse> addClass(
            @RequestBody AddClassRequest request
    ) {
        return ApiResponse.<AdminClassResponse>builder()
                .data(classService.addClass(request))
                .build();
    }

    @Operation(summary = "Update class for Admin", description = "API update class for Admin")
    @PutMapping("/admin")
    public ApiResponse<AdminClassResponse> updateClass(
            @RequestBody UpdateClassRequest request
    ) {
        return ApiResponse.<AdminClassResponse>builder()
                .data(classService.updateClass(request))
                .build();
    }

    @Operation(summary = "Delete class", description = "API delete class for Admin")
    @DeleteMapping("/admin/{id}")
    public ApiResponse<Boolean> deleteClass(
            @PathVariable Integer id
    ) {
        return ApiResponse.<Boolean>builder()
                .data(classService.deleteClass(id))
                .build();
    }
}
