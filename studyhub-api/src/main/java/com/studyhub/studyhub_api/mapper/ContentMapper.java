package com.studyhub.studyhub_api.mapper;

import com.studyhub.studyhub_api.dto.response.content.ContentResponse;
import com.studyhub.studyhub_api.dto.response.section.ContentLiteResponse;
import com.studyhub.studyhub_api.model.Content;
import com.studyhub.studyhub_api.model.Material;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring", uses = ResourceMapper.class)
public interface ContentMapper {
    @Mapping(target = "contentId", source = "id")
    ContentLiteResponse toContentLiteResponse(Content content);

    @Mappings({
            @Mapping(target = "contentName", source = "content.contentName"),
            @Mapping(target = "description", source = "content.description"),
            @Mapping(target = "video", source = "content.videoContent.url"),
            @Mapping(target = "textContent", source = "content.textContent"),
            @Mapping(target = "type", source = "content.type"),
            @Mapping(target = "resources", source = "materials", qualifiedByName = "mapMaterialToResource")
    })
    ContentResponse toContentResponse(Content content, List<Material> materials);
}
