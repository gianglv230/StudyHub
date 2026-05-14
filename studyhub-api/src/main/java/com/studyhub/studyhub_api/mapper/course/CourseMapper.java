package com.studyhub.studyhub_api.mapper.course;

import com.studyhub.studyhub_api.dto.response.course.CourseLiteResponse;
import com.studyhub.studyhub_api.model.Course;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface CourseMapper {

    @Mappings({
            @Mapping(target = "courseId", source = "id"),
            @Mapping(target = "thumbnail", source = "thumbnail.url")
    })
    CourseLiteResponse toCourseLiteResponse(Course course);
}
