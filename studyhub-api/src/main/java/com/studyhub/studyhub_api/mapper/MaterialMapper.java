package com.studyhub.studyhub_api.mapper;

import com.studyhub.studyhub_api.dto.response.class_lesson.MaterialResponse;
import com.studyhub.studyhub_api.model.Material;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = ResourceMapper.class)
public interface MaterialMapper {
    MaterialResponse toMaterialResponse(Material material);
}
