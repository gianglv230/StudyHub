package com.studyhub.studyhub_api.mapper;

import com.studyhub.studyhub_api.dto.request.class_lesson.ClassLessonTeacherRequest;
import com.studyhub.studyhub_api.dto.response.class_lesson.ClassLessonTeacherResponse;
import com.studyhub.studyhub_api.dto.response.classes.ClassLessonBasicResponse;
import com.studyhub.studyhub_api.dto.response.content.ResourceResponse;
import com.studyhub.studyhub_api.dto.response.resource.ChildrenResourceResponse;
import com.studyhub.studyhub_api.dto.response.section.SectionResponse;
import com.studyhub.studyhub_api.model.ClassLesson;
import com.studyhub.studyhub_api.model.ClassLessonConfig;
import com.studyhub.studyhub_api.model.Section;
import org.mapstruct.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Mapper(componentModel = "spring", uses = {SectionMapper.class, ResourceMapper.class})
public interface ClassLessonMapper {
    @Mappings({
            @Mapping(target = "classLessonId", source = "classLesson.id"),
            @Mapping(target = "slug", source = "classLesson.slug"),
            @Mapping(target = "lessonTitle", source = "classLesson.titleOverride"),
            @Mapping(target = "orderIndex", source = "orderIndex"),
            @Mapping(target = "createdAt", source = "classLesson.createdAt"),
            @Mapping(target = "updatedAt", source = "classLesson.updatedAt"),
    })
    ClassLessonBasicResponse toClassLessonBasicResponse(
            ClassLessonConfig classLessonConfig
    );

    // Unused
    @Mappings({
            @Mapping(target = "orderIndex", source = "classLessonConfigs", qualifiedByName = "mapOrderIndex")
    })
    ClassLessonBasicResponse toClassLessonBasicResponse(ClassLesson classLesson);

    @Named("mapOrderIndex")
    default Integer mapOrderIndex(Set<ClassLessonConfig> classLessonConfigs) {
        if (classLessonConfigs == null || classLessonConfigs.isEmpty()) {
            return null;
        }

        return classLessonConfigs.iterator().next().getOrderIndex();
    }

//    ClassLessonTeacherResponse toClassLessonTeacherResponse(ClassLesson classLesson);

    ClassLesson toClassLesson(ClassLessonTeacherRequest classLessonTeacherRequest);

    // 1. Method cha: Nhận Map context và tự động chuyển tiếp xuống SectionMapper
    ClassLessonTeacherResponse toClassLessonTeacherResponse(
            ClassLesson classLesson,
            @Context Map<Integer, ChildrenResourceResponse> resourceMap
    );
}
