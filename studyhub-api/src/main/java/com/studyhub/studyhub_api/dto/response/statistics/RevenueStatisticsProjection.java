package com.studyhub.studyhub_api.dto.response.statistics;

import java.math.BigDecimal;

public interface RevenueStatisticsProjection {
    Integer getRevenueMonth();
    String getStatus();
    BigDecimal getSumRevenue();
}
