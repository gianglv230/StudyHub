package com.studyhub.studyhub_api.mapper;

import com.studyhub.studyhub_api.dto.response.classes.ClassLessonBasicResponse;
import com.studyhub.studyhub_api.model.ClassLesson;
import com.studyhub.studyhub_api.model.ClassLessonConfig;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;

import java.util.Set;

@Mapper(componentModel = "spring")
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
}
