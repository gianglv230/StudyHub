package com.studyhub.studyhub_api.dto.response.statistics;

import java.util.List;

public record StatisticsBasicResponse(
        Long numberOfStudent,
        Long numberOfTeacher,
        Long numberOfCourses,
        Long numberOfClasses,
        Long numberOfPresent,
        Long numberOfAbsent,
        List<Integer> revenueYears
) {
}
