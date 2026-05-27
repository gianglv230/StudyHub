package com.studyhub.studyhub_api.mapper;

import com.studyhub.studyhub_api.dto.response.class_lesson.ResourceTeacherResponse;
import com.studyhub.studyhub_api.dto.response.content.ResourceResponse;
import com.studyhub.studyhub_api.dto.response.resource.ChildrenResourceResponse;
import com.studyhub.studyhub_api.dto.response.resource.FileInfoResponse;
import com.studyhub.studyhub_api.dto.response.resource.FolderResourceResponse;
import com.studyhub.studyhub_api.dto.response.resource.ParentResourceResponse;
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

    @Mapping(target = "parent", source = "resourceParent")
    FolderResourceResponse toFolderResourceResponse(Resource resource);
    ParentResourceResponse toParentResourceResponse(Resource resource);
    ChildrenResourceResponse toChildrenResourceResponse(Resource resource);

    FileInfoResponse toFileInfoResponse(Resource resource);
}
