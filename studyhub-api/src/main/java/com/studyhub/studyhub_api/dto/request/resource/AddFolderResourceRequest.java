package com.studyhub.studyhub_api.dto.request.resource;

public record AddFolderResourceRequest (
        String resourceName,
        Integer resourceParentId
){}
