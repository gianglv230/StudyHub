package com.studyhub.studyhub_api.service.resource.impl;

import com.studyhub.studyhub_api.dto.request.resource.AddFolderResourceRequest;
import com.studyhub.studyhub_api.dto.request.resource.RenameFolderResourceRequest;
import com.studyhub.studyhub_api.dto.response.resource.FolderResourceResponse;
import com.studyhub.studyhub_api.enums.TypeResource;
import com.studyhub.studyhub_api.exception.AppException;
import com.studyhub.studyhub_api.exception.ErrorCode;
import com.studyhub.studyhub_api.mapper.ResourceMapper;
import com.studyhub.studyhub_api.model.Resource;
import com.studyhub.studyhub_api.repository.ResourceRepository;
import com.studyhub.studyhub_api.service.auth.AuthenticationService;
import com.studyhub.studyhub_api.service.resource.ResourceService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ResourceServiceImpl implements ResourceService {

    AuthenticationService authService;
    ResourceRepository resourceRepository;
    ResourceMapper resourceMapper;

    @PreAuthorize("hasAnyRole('TEACHER', 'ADMIN')")
    @Transactional(readOnly = true)
    @Override
    public FolderResourceResponse getFolders(Integer parentFolderId) {
        Resource resource = authService.checkOwnerResource(parentFolderId);
        return resourceMapper.toFolderResourceResponse(resource);
    }

    @PreAuthorize("hasAnyRole('TEACHER', 'ADMIN')")
    @Override
    public Boolean addFolder(AddFolderResourceRequest request) {
        Resource resource = authService.checkOwnerResource(request.resourceParentId());
        Resource newResource = Resource.builder()
                .resourceName(request.resourceName())
                .resourceParent(resource)
                .resourceType(TypeResource.FOLDER.getValue())
                .isPublic(false)
                .build();
        resourceRepository.save(newResource);
        return true;
    }

    @PreAuthorize("hasAnyRole('TEACHER', 'ADMIN')")
    @Override
    public Boolean renameFolder(RenameFolderResourceRequest request) {
        Resource resource = authService.checkOwnerResource(request.id());
        resource.setResourceName(request.resourceName());
        resourceRepository.save(resource);
        return true;
    }

    @PreAuthorize("hasAnyRole('TEACHER', 'ADMIN')")
    @Override
    public Boolean deleteFolder(Integer folderId) {
        Resource resource = authService.checkOwnerResource(folderId);
        boolean hasChild = resourceRepository.existsByResourceParentId(folderId);
        if(hasChild){
            throw new AppException(ErrorCode.FOLDER_HAS_CHILD);
        }
        resourceRepository.delete(resource);
        return true;
    }
}
