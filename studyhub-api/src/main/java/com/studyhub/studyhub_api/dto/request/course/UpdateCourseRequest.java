package com.studyhub.studyhub_api.dto.request.course;

import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@SuperBuilder
public class UpdateCourseRequest extends AdminCourseBaseRequest {
    Integer id;
    List<UpdateLessonRequest> lessons;
}
