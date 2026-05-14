package com.studyhub.studyhub_api.mapper;

import com.studyhub.studyhub_api.dto.response.course.LessonResponse;
import com.studyhub.studyhub_api.model.Lesson;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LessonMapper {

    @Mapping(target = "lessonId", source = "id")
    LessonResponse toLessonResponse(Lesson lesson);


}
