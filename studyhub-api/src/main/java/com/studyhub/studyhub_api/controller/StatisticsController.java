package com.studyhub.studyhub_api.controller;

import com.studyhub.studyhub_api.dto.response.ApiResponse;
import com.studyhub.studyhub_api.dto.response.statistics.RevenueStatisticsResponse;
import com.studyhub.studyhub_api.dto.response.statistics.StatisticsBasicResponse;
import com.studyhub.studyhub_api.service.statistics.StatisticsService;
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
@RequestMapping("/statistics")
@Tag(name = "Statistics Controller")
public class StatisticsController {
    StatisticsService service;

    @Operation(summary = "Get basic statistics", description = "API get basic statistics")
    @GetMapping("/basic")
    public ApiResponse<StatisticsBasicResponse> getBasicStatistics() {
        return ApiResponse.<StatisticsBasicResponse>builder()
                .data(service.getBasicStatistics())
                .build();
    }

    @Operation(summary = "Get revenue statistics by year", description = "API get basic statistics by year")
    @GetMapping("/revenue/{year}")
    public ApiResponse<List<RevenueStatisticsResponse>> getRevenueStatisticsByYear(@PathVariable("year") int year) {
        return ApiResponse.<List<RevenueStatisticsResponse>>builder()
                .data(service.getRevenueStatistics(year))
                .build();
    }
}
