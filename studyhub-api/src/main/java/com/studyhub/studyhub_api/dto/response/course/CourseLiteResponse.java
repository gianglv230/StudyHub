package com.studyhub.studyhub_api.dto.response.course;

public record CourseLiteResponse(
        Integer courseId,
        String slug,
        String title,
        Integer numberOfLessons,
        String subject,
        String targetGrade,
        String categoryName,
        String thumbnail
) {}
