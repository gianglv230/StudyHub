package com.studyhub.studyhub_api.controller;

import com.studyhub.studyhub_api.dto.response.ApiResponse;
import com.studyhub.studyhub_api.dto.response.enrollment.StudentInClassResponse;
import com.studyhub.studyhub_api.service.enrollment.EnrollmentService;
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
@RequestMapping("/enrollment")
@Tag(name = "Enrollment Controller")
public class EnrollmentController {
    private final EnrollmentService enrollmentService;

    @Operation(summary = "Get student in class", description = "API get student in class")
    @GetMapping("/admin/{classSlug}")
    public ApiResponse<List<StudentInClassResponse>> getStudentsInClass(@PathVariable String classSlug) {
        return ApiResponse.<List<StudentInClassResponse>>builder()
                .data(enrollmentService.getStudentsInClass(classSlug))
                .build();
    }
}
