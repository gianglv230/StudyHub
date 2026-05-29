package com.studyhub.studyhub_api.dto.response.classes;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ClassLessonBasicResponse{
    //title_override
    Integer classLessonId;
    String slug;
    String lessonTitle;
    Integer orderIndex;

    Integer numberOfSection;
//    Integer numberOfContent;

    Instant createdAt;
    Instant updatedAt;
}
