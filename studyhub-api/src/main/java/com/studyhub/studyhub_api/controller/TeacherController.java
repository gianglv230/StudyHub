package com.studyhub.studyhub_api.controller;

import com.studyhub.studyhub_api.dto.response.ApiResponse;
import com.studyhub.studyhub_api.dto.response.teacher.TeacherLiteResponse;
import com.studyhub.studyhub_api.service.user_account.TeacherService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/teacher")
@Tag(name = "Teacher Controller")
public class TeacherController {
    private final TeacherService teacherService;

    @Operation(summary = "Get teacher list", description = "API get teacher list for guest home")
    @GetMapping("/list")
    public ApiResponse<List<TeacherLiteResponse>> getTeacherList(){
        return ApiResponse.<List<TeacherLiteResponse>>builder()
                .data(teacherService.getTeacherList())
                .build();
    }
}
