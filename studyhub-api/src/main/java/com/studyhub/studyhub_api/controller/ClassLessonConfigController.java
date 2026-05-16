package com.studyhub.studyhub_api.controller;

import com.studyhub.studyhub_api.dto.request.class_lesson_config.AddClassLessonConfigRequest;
import com.studyhub.studyhub_api.dto.response.ApiResponse;
import com.studyhub.studyhub_api.service.class_lesson_config.ClassLessonConfigService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/clc")
@Tag(name = "Class Lesson Config Controller")
public class ClassLessonConfigController {
    ClassLessonConfigService clcService;

    @Operation(summary = "Delete class lesson config", description = "API delete class lesson config")
    @DeleteMapping("/{clcId}")
    public ApiResponse<Boolean> deleteClassLessonConfig(@PathVariable Integer clcId) {
        return ApiResponse.<Boolean>builder()
                .data(clcService.deleteClassLessonConfig(clcId))
                .build();
    }

    @Operation(summary = "Add class lesson in class", description = "Add class lesson in class")
    @PostMapping()
    public ApiResponse<Boolean> addClassLessonConfig(@RequestBody AddClassLessonConfigRequest addClassLessonConfigRequest) {
        return ApiResponse.<Boolean>builder()
                .data(clcService.addClassLessonConfig(addClassLessonConfigRequest))
                .build();
    }

    @Operation(summary = "Update order index", description = "Update order index")
    @PatchMapping("/{clcId}/{orderIndex}")
    public ApiResponse<Boolean> updateOrderIndex(@PathVariable Integer clcId, @PathVariable Integer orderIndex) {
        return ApiResponse.<Boolean>builder()
                .data(clcService.updateOrderIndex(clcId, orderIndex))
                .build();
    }
}
