package com.studyhub.studyhub_api.dto.response.course;

public interface CourseLiteProjection {

    Integer getCourseId();

    String getSlug();

    String getTitle();

    Integer getNumberOfLessons();

    String getSubject();

    String getTargetGrade();

    String getCategoryName();

    String getThumbnail();
}
