package com.studyhub.studyhub_api.controller;

import com.studyhub.studyhub_api.dto.response.ApiResponse;
import com.studyhub.studyhub_api.dto.response.attendance.StudentAttendanceResponse;
import com.studyhub.studyhub_api.service.attendance.AttendanceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/attendance")
@Tag(name = "Attendance Controller")
public class AttendanceController {
    private final AttendanceService attendanceService;

    @Operation(summary = "Get student attendance by class", description = "API get student attendance by class")
    @GetMapping("/student/{classSlug}")
    public ApiResponse<StudentAttendanceResponse> getStudentAttendanceByClass(@PathVariable("classSlug") String classSlug) {
        return ApiResponse.<StudentAttendanceResponse>builder()
                .data(attendanceService.getMyAttendanceByClass(classSlug))
                .build();
    }
}
