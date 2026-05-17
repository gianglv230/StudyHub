package com.studyhub.studyhub_api.mapper;

import com.studyhub.studyhub_api.dto.request.course.LessonBaseRequest;
import com.studyhub.studyhub_api.dto.response.course.LessonLiteResponse;
import com.studyhub.studyhub_api.model.Lesson;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LessonMapper {

    @Mapping(target = "lessonId", source = "id")
    LessonLiteResponse toLessonResponse(Lesson lesson);

    Lesson toLesson(LessonBaseRequest lesson);
}
