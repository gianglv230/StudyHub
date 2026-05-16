package com.studyhub.studyhub_api.mapper;

import com.studyhub.studyhub_api.dto.response.class_lesson.ResourceTeacherResponse;
import com.studyhub.studyhub_api.dto.response.content.ResourceResponse;
import com.studyhub.studyhub_api.model.Material;
import com.studyhub.studyhub_api.model.Resource;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface ResourceMapper {
    @Mapping(target = "resourceId", source = "id")
    ResourceResponse toResourceResponse(Resource resource);

    @Named("mapMaterialToResource")
    default ResourceResponse toResourceResponse(Material material) {
        return toResourceResponse(material.getResource());
    }

    ResourceTeacherResponse toResourceTeacherResponse(Resource resource);
}
