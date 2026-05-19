package com.studyhub.studyhub_api.dto.response.resource;

import java.util.List;

public record FolderResourceResponse(
        Integer id,
        String resourceName,
        ParentResourceResponse parent,
        List<ChildrenResourceResponse> children
) {
}
