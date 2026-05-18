package com.studyhub.studyhub_api.controller;

import com.studyhub.studyhub_api.dto.request.enrollment.AddStudentRequest;
import com.studyhub.studyhub_api.dto.request.enrollment.MergeClassRequest;
import com.studyhub.studyhub_api.dto.request.enrollment.SuspendStudentRequest;
import com.studyhub.studyhub_api.dto.request.enrollment.TransferStudentRequest;
import com.studyhub.studyhub_api.dto.response.ApiResponse;
import com.studyhub.studyhub_api.dto.response.enrollment.StudentInClassResponse;
import com.studyhub.studyhub_api.service.enrollment.EnrollmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @Operation(summary = "Add student in class", description = "API add student in class")
    @PostMapping("/admin/add")
    public ApiResponse<Boolean> addStudent(
            @RequestBody AddStudentRequest request
            ) {
        return ApiResponse.<Boolean>builder()
                .data(enrollmentService.addStudent(request))
                .build();
    }

    @Operation(summary = "Suspend student in class", description = "API suspend student in class")
    @PutMapping("/admin/suspend")
    public ApiResponse<Boolean> suspendStudent(
            @RequestBody SuspendStudentRequest request
    ) {
        return ApiResponse.<Boolean>builder()
                .data(enrollmentService.suspendStudent(request))
                .build();
    }

    @Operation(summary = "Transfer student", description = "API transfer student")
    @PostMapping("/admin/transfer")
    public ApiResponse<Boolean> transferStudent(
            @RequestBody TransferStudentRequest request
    ) {
        return ApiResponse.<Boolean>builder()
                .data(enrollmentService.transferStudent(request))
                .build();
    }

    @Operation(summary = "Suspend list student in class", description = "API suspend list student in class")
    @PutMapping("/admin/suspend/list")
    public ApiResponse<Boolean> suspendStudents(
            @RequestBody List<SuspendStudentRequest> request
    ) {
        return ApiResponse.<Boolean>builder()
                .data(enrollmentService.suspendListStudent(request))
                .build();
    }

    @Operation(summary = "Transfer list student", description = "API transfer list student")
    @PostMapping("/admin/transfer/list")
    public ApiResponse<Boolean> transferStudents(
            @RequestBody List<TransferStudentRequest> request
    ) {
        return ApiResponse.<Boolean>builder()
                .data(enrollmentService.transferListStudent(request))
                .build();
    }

    @Operation(summary = "Merge class", description = "API merge class")
    @PostMapping("/admin/transfer/merge")
    public ApiResponse<Boolean> mergeClass(
            @RequestBody MergeClassRequest request
    ) {
        return ApiResponse.<Boolean>builder()
                .data(enrollmentService.mergeClass(request))
                .build();
    }
}
