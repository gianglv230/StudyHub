package com.studyhub.studyhub_api.dto.request.course;

import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@SuperBuilder
public class AdminCourseBaseRequest {
    String slug;
    String title;
    String description;
    String categoryName;
    String targetGrade;
    String subject;
    Integer thumbnailId;
    Integer videoId;
    Integer numberOfLessons;
    String status;
}
