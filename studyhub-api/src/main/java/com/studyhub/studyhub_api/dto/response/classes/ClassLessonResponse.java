package com.studyhub.studyhub_api.dto.response.classes;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ClassLessonResponse{
        Integer classId;
        String className;
        Integer numberOfLesson;
        String classSchedule;

        String teacherName;
        String thumbnail;

        Integer progressOfClass;
        List<ClassLessonBasicResponse> lessons;
}
