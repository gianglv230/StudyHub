package com.studyhub.studyhub_api.dto.response.course;

import java.util.List;

public record CourseFilterOptionsResponse(
        List<String> subjects,
        List<String> targetGrades,
        List<String> categories
) {}
