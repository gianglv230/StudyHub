package com.studyhub.studyhub_api.mapper;

import com.studyhub.studyhub_api.dto.response.classes.ClassDetailLiteResponse;
import com.studyhub.studyhub_api.dto.response.classes.ClassLiteResponse;
import com.studyhub.studyhub_api.dto.response.classes.ClassProgressResponse;
import com.studyhub.studyhub_api.model.Class;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ClassMapper {
    @Mappings({
            @Mapping(target = "classId", source = "id"),
            @Mapping(target = "teacherId", source = "teacher.id"),
            @Mapping(target = "teacherName", source = "teacher.fullname"),
            @Mapping(target = "subject", source = "course.subject"),
            @Mapping(target = "targetGrade", source = "course.targetGrade"),
            @Mapping(target = "categoryName", source = "course.categoryName"),
            @Mapping(target = "thumbnail", source = "course.thumbnail.url")
    })
    ClassLiteResponse toClassLiteResponse(Class clazz);

    @Mappings({
            @Mapping(target = "classId", source = "id"),
            @Mapping(target = "courseId", source = "course.id"),
            @Mapping(target = "teacherId", source = "teacher.id"),
            @Mapping(target = "teacherName", source = "teacher.fullname"),
            @Mapping(target = "subject", source = "course.subject"),
            @Mapping(target = "targetGrade", source = "course.targetGrade"),
            @Mapping(target = "categoryName", source = "course.categoryName"),
            @Mapping(target = "video", source = "course.videoDemo.url"),
            @Mapping(target = "description", source = "course.description")
    })
    ClassDetailLiteResponse toClassDetailLiteResponse(Class clazz);

    @Mappings({
            @Mapping(target = "classId", source = "clazz.id"),
            @Mapping(target = "teacherId", source = "clazz.teacher.id"),
            @Mapping(target = "teacherName", source = "clazz.teacher.fullname"),
            @Mapping(target = "subject", source = "clazz.course.subject"),
            @Mapping(target = "targetGrade", source = "clazz.course.targetGrade"),
            @Mapping(target = "categoryName", source = "clazz.course.categoryName"),
            @Mapping(target = "numberOfLessons", source = "clazz.course.numberOfLessons"),
            @Mapping(target = "thumbnail", source = "clazz.thumbnailOverride.url"),
            @Mapping(target = "numberOfStudent", source = "clazz.numberOfStudent"),
            @Mapping(target = "progressOfClass", source = "progressOfClass")
    })
    ClassProgressResponse toClassProgressResponse(Class clazz, int progressOfClass);
}
