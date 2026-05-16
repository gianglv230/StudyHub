package com.studyhub.studyhub_api.service.statistics;

import com.studyhub.studyhub_api.dto.response.statistics.RevenueStatisticsResponse;
import com.studyhub.studyhub_api.dto.response.statistics.StatisticsBasicResponse;

import java.util.List;

public interface StatisticsService {
    StatisticsBasicResponse getBasicStatistics();
    List<RevenueStatisticsResponse> getRevenueStatistics(Integer year);
}
