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
public class LessonBaseRequest{
    String title;
    Integer orderIndex;
}
