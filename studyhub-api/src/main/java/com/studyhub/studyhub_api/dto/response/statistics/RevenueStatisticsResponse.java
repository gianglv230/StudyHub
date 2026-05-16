package com.studyhub.studyhub_api.dto.response.statistics;

import java.math.BigDecimal;

public record RevenueStatisticsResponse (
        Integer month,
        BigDecimal revenue
){
}
