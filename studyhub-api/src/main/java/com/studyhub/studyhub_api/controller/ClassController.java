package com.studyhub.studyhub_api.controller;

import com.studyhub.studyhub_api.dto.response.ApiResponse;
import com.studyhub.studyhub_api.dto.response.PageResponse;
import com.studyhub.studyhub_api.dto.response.classes.ClassDetailLiteResponse;
import com.studyhub.studyhub_api.dto.response.classes.ClassLiteResponse;
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
    public ApiResponse<ClassDetailLiteResponse> getClassDetailLite(@PathVariable String classSlug){
        return ApiResponse.<ClassDetailLiteResponse>builder()
                .data(classService.getClassDetailLite(classSlug))
                .build();
    }
}
