package com.studyhub.studyhub_api.controller;

import com.studyhub.studyhub_api.dto.response.ApiResponse;
import com.studyhub.studyhub_api.dto.response.attendance.AttendanceRowResponse;
import com.studyhub.studyhub_api.dto.response.attendance.SessionDateResponse;
import com.studyhub.studyhub_api.dto.response.attendance.StudentAttendanceResponse;
import com.studyhub.studyhub_api.service.attendance.AttendanceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

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

    @Operation(summary = "Get session dates by class slug", description = "API get session dates by class slug")
    @GetMapping("/session-date/{classSlug}")
    public ApiResponse<SessionDateResponse> getSessionDate(@PathVariable String classSlug) {
        return ApiResponse.<SessionDateResponse>builder()
                .data(attendanceService.getDistinctSessionDateByClassSlug(classSlug))
                .build();
    }

    @Operation(summary = "Get attendace rows by class slug and SessionDate", description = "API get session dates by class slug and SessionDate")
    @GetMapping("/rows/{classSlug}")
    public ApiResponse<List<AttendanceRowResponse>> getAttendanceRows(@PathVariable String classSlug, @RequestParam("session-date") LocalDate sessionDate) {
        return ApiResponse.<List<AttendanceRowResponse>>builder()
                .data(attendanceService.getAttendanceRowBySessionDateAndClassSlug(sessionDate, classSlug))
                .build();
    }
}
