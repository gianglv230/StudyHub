package com.studyhub.studyhub_api.mapper;

import com.studyhub.studyhub_api.dto.request.classes.AddClassRequest;
import com.studyhub.studyhub_api.dto.request.classes.UpdateClassRequest;
import com.studyhub.studyhub_api.dto.response.classes.*;
import com.studyhub.studyhub_api.model.Class;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring", uses = {ClassLessonMapper.class, ResourceMapper.class, LessonMapper.class})
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
            @Mapping(target = "numberOfLessons", source = "course.numberOfLessons"),
            @Mapping(target = "teacherId", source = "teacher.id"),
            @Mapping(target = "teacherName", source = "teacher.fullname"),
            @Mapping(target = "subject", source = "course.subject"),
            @Mapping(target = "targetGrade", source = "course.targetGrade"),
            @Mapping(target = "categoryName", source = "course.categoryName"),
            @Mapping(target = "video", source = "course.videoDemo.url"),
            @Mapping(target = "description", source = "course.description"),
            @Mapping(target = "lessons", source = "course.lessons")
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

    @Mappings({
            @Mapping(target = "classId", source = "clazz.id"),
            @Mapping(target = "teacherName", source = "clazz.teacher.fullname"),
            @Mapping(target = "thumbnail", source = "clazz.thumbnailOverride.url"),
            @Mapping(target = "progressOfClass", source = "progressOfClass"),
            @Mapping(target = "numberOfLesson", source = "clazz.course.numberOfLessons"),
            @Mapping(target = "lessons", source = "clazz.classLessonConfigs")
    })
    ClassLessonResponse toClassLessonResponse(Class clazz, Integer progressOfClass);

    @Mappings({
            @Mapping(target = "classId", source = "clazz.id"),
            @Mapping(target = "teacherId", source = "clazz.teacher.id"),
            @Mapping(target = "teacherName", source = "clazz.teacher.fullname"),
            @Mapping(target = "subject", source = "clazz.course.subject"),
            @Mapping(target = "targetGrade", source = "clazz.course.targetGrade"),
            @Mapping(target = "categoryName", source = "clazz.course.categoryName"),
            @Mapping(target = "thumbnail", source = "clazz.course.thumbnail.url"),
            @Mapping(target = "createdBy", source = "createdBy"),
            @Mapping(target = "updatedBy", source = "updatedBy")
    })
    ClassAdminResponse toClassAdminResponse(Class clazz, String createdBy, String updatedBy);

//    @Named("mapClassLessons")
//    default List<ClassLessonBasicResponse> mapClassLessons(Set<ClassLessonConfig> classLessonConfigs){
//        return classLessonConfigs.stream()
//                .map(classLessonConfig -> toClassLessonBasicResponse(classLessonConfig.getClassLesson()))
//                .toList();
//    }

    @Mappings({
            @Mapping(target = "teacherId", source = "clazz.teacher.id"),
            @Mapping(target = "teacherName", source = "clazz.teacher.fullname"),
            @Mapping(target = "courseId", source = "clazz.course.id"),
            @Mapping(target = "courseName", source = "clazz.course.title"),
            @Mapping(target = "createdBy", source = "createdBy"),
            @Mapping(target = "updatedBy", source = "updatedBy")
    })
    AdminClassResponse toAdminClassResponse(Class clazz, String createdBy, String updatedBy);

    @Mappings({
            @Mapping(target = "teacher.id", source = "teacherId"),
//            @Mapping(target = "course.id", source = "courseId"),
            @Mapping(target = "thumbnailOverride.id", source = "thumbnailId"),
    })
    Class toClass(AddClassRequest request);

    @Mappings({
            @Mapping(target = "teacher.id", source = "teacherId"),
            @Mapping(target = "thumbnailOverride.id", source = "thumbnailId"),
    })
    void updateClass(UpdateClassRequest request, @MappingTarget Class clazz);

    @Mappings({
            @Mapping(target = "teacherId", source = "clazz.teacher.id"),
            @Mapping(target = "teacherName", source = "clazz.teacher.fullname"),
            @Mapping(target = "courseId", source = "clazz.course.id"),
            @Mapping(target = "courseName", source = "clazz.course.title"),
            @Mapping(target = "subject", source = "clazz.course.subject"),
            @Mapping(target = "targetGrade", source = "clazz.course.targetGrade"),
            @Mapping(target = "categoryName", source = "clazz.course.categoryName")
    })
    AdminClassInfoResponse toAdminClassInfoResponse(Class clazz);
}
