package com.studyhub.studyhub_api.dto.response.course;

import com.studyhub.studyhub_api.dto.response.content.ResourceResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AdminCourseResponse {
    Integer id;
    String slug;
    String title;
    String description;
    String subject;
    String targetGrade;
    String categoryName;
    ResourceResponse thumbnail;
    ResourceResponse videoDemo;
    Integer numberOfLessons;
    String status;
    List<AdminLessonResponse> lessons;
    Instant createdAt;
    String createdBy;
    Instant updatedAt;
    String updatedBy;
}
