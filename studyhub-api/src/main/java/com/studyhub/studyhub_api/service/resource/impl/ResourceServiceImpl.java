package com.studyhub.studyhub_api.service.resource.impl;

import com.studyhub.studyhub_api.dto.request.resource.AddFolderResourceRequest;
import com.studyhub.studyhub_api.dto.request.resource.RenameFolderResourceRequest;
import com.studyhub.studyhub_api.dto.request.resource.UpdateResourceRequest;
import com.studyhub.studyhub_api.dto.request.resource.UploadResourceRequest;
import com.studyhub.studyhub_api.dto.response.resource.FileInfoResponse;
import com.studyhub.studyhub_api.dto.response.resource.FolderResourceResponse;
import com.studyhub.studyhub_api.enums.FileAccessType;
import com.studyhub.studyhub_api.enums.TypeResource;
import com.studyhub.studyhub_api.exception.AppException;
import com.studyhub.studyhub_api.exception.ErrorCode;
import com.studyhub.studyhub_api.mapper.ResourceMapper;
import com.studyhub.studyhub_api.model.Resource;
import com.studyhub.studyhub_api.model.UserAccount;
import com.studyhub.studyhub_api.repository.ClassLessonRepository;
import com.studyhub.studyhub_api.repository.ClassRepository;
import com.studyhub.studyhub_api.repository.CourseRepository;
import com.studyhub.studyhub_api.repository.ResourceRepository;
import com.studyhub.studyhub_api.service.auth.AuthenticationService;
import com.studyhub.studyhub_api.service.cloudinary.CloudinaryService;
import com.studyhub.studyhub_api.service.resource.ResourceService;
import com.studyhub.studyhub_api.util.FileUploadUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class ResourceServiceImpl implements ResourceService {

    AuthenticationService authService;
    ResourceRepository resourceRepository;
    CloudinaryService cloudinaryService;

    ResourceMapper resourceMapper;

    @PreAuthorize("hasAnyRole('TEACHER', 'ADMIN')")
    @Transactional(readOnly = true)
    @Override
    public FolderResourceResponse getFolders(Integer parentFolderId) {
        Resource resource = authService.checkOwnerResource(parentFolderId);
        if (resource != null) {
            return resourceMapper.toFolderResourceResponse(resource);
        }

        var account = authService.getUserAccountByJwtToken();
        var resources = resourceRepository.findByResourceParentIsNullAndCreatedByAndResourceTypeEqualsIgnoreCase(account.getId(), TypeResource.FOLDER.getValue());
        var children = resources.stream().map(resourceMapper::toChildrenResourceResponse).toList();
        return new FolderResourceResponse(null, null, null, children);
    }

    @PreAuthorize("hasAnyRole('TEACHER', 'ADMIN')")
    @Override
    public Boolean addFolder(AddFolderResourceRequest request) {
        Resource resource = authService.checkOwnerParentResource(request.resourceParentId());
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
        if (hasChild) {
            throw new AppException(ErrorCode.FOLDER_HAS_CHILD);
        }
        resourceRepository.delete(resource);
        return true;
    }

    private String buildPublicId(UploadResourceRequest request, String fileName) {
        UserAccount account = authService.getUserAccountByJwtToken();
        StringBuilder path = new StringBuilder(account.getId().toString());

        if (request.courseId() == null) return path.append("/").append(fileName).toString();
        path.append("/").append(request.courseId());

        if (request.classId() == null) return path.append("/").append(fileName).toString();
        path.append("/").append(request.classId());

        if (request.classLessonId() == null) return path.append("/").append(fileName).toString();
        path.append("/").append(request.classLessonId());

        return path.append("/").append(fileName).toString();
    }

    @PreAuthorize("hasAnyRole('TEACHER', 'ADMIN')")
    @Override
    public Boolean uploadResource(UploadResourceRequest request) throws IOException {
        Resource resource = authService.checkOwnerParentResource(request.resourceParentId());
        var file = request.file();

        // Check file
        FileUploadUtil.assertAllowedFile(file);
        String originalFilename = file.getOriginalFilename();
        String publicId = buildPublicId(request, FileUploadUtil.generateFileName(originalFilename));

        String resourceType = FileUploadUtil.detectType(file);
//        FileAccessType fileAccessType = request.isPublic() ? FileAccessType.PUBLIC : FileAccessType.PRIVATE;
        FileAccessType fileAccessType = FileAccessType.PUBLIC;
        // Upload cloudinary
        var response = cloudinaryService.uploadFile(file, publicId, resourceType, fileAccessType);

        Resource newResource = Resource.builder()
                .resourceName(originalFilename)
//                .url(request.isPublic() ? response.getUrl() : null)
                .url(response.getUrl())
                .extension(FilenameUtils.getExtension(originalFilename))
                .resourceType(resourceType)
                .isPublic(request.isPublic())
                .publicId(response.getPublicId()) // ✅ dùng publicId từ Cloudinary response (có folder prefix)
                .resourceParent(resource)
                .build();

        resourceRepository.save(newResource);

        return true;
    }

    @PreAuthorize("hasAnyRole('TEACHER', 'ADMIN')")
    @Override
    public Boolean deleteResource(Integer resourceId) throws IOException {
        Resource resource = authService.checkOwnerResource(resourceId);

        // Không được xóa folder
        if (resource.getResourceType().equalsIgnoreCase(TypeResource.FOLDER.getValue())) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        // Xóa file nếu có
        String publicId = resource.getPublicId();
        if (publicId == null) {
            resourceRepository.delete(resource);
            return true;
        }
        ;

        if(publicId != null){
            cloudinaryService.deleteFile(publicId, resource.getResourceType());
        }
        resourceRepository.delete(resource);

        return true;
    }

    @PreAuthorize("hasAnyRole('TEACHER', 'ADMIN')")
    @Override
    public Boolean updateResource(UpdateResourceRequest request) throws IOException {
        Resource resource = authService.checkOwnerResource(request.id());
        // Upload new file
        var file = request.file();

        // Check file
        FileUploadUtil.assertAllowedFile(file);
        String originalFilename = file.getOriginalFilename();

        // Build publicId
        String publicId = resource.getPublicId();
        int lastSlash = publicId.lastIndexOf('/');
        String parentPath = lastSlash != -1
                ? publicId.substring(0, lastSlash)
                : publicId;
        String newPublicId = parentPath + "/" + FileUploadUtil.generateFileName(originalFilename);

        // Check new resource match old resource at resourceType
        String resourceType = FileUploadUtil.detectType(file);
        if (!resourceType.equalsIgnoreCase(resource.getResourceType())) {
            throw new AppException(ErrorCode.RESOURCE_TYPE_INVALID);
        }

//        FileAccessType fileAccessType = resource.getIsPublic() ? FileAccessType.PUBLIC : FileAccessType.PRIVATE;
        FileAccessType fileAccessType = FileAccessType.PUBLIC;

        // Lưu lại oldPublicId và resourceType trước khi thay đổi
        String oldPublicId = resource.getPublicId();
        String oldResourceType = resource.getResourceType();

        // Upload cloudinary
        var response = cloudinaryService.uploadFile(file, newPublicId, resourceType, fileAccessType);

        resource.setResourceName(originalFilename);
        resource.setUrl(response.getUrl());
        resource.setExtension(FilenameUtils.getExtension(originalFilename));
        resource.setResourceType(resourceType);
        resource.setPublicId(response.getPublicId()); // ✅ dùng publicId từ Cloudinary response

        resourceRepository.save(resource);

        // ✅ Xóa file CŨ sau khi save thành công
        if(publicId != null){
            cloudinaryService.deleteFile(oldPublicId, oldResourceType);
        }

        return true;
    }

    @PreAuthorize("hasAnyRole('TEACHER', 'ADMIN')")
    @Override
    public FileInfoResponse getFileInfo(Integer resourceId) {
        Resource resource = authService.checkOwnerResource(resourceId);
        return resourceMapper.toFileInfoResponse(resource);
    }

    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER', 'ADMIN')")
    @Override
    public String getSignedUrl(Integer resourceId) {
        Resource resource = resourceRepository.findById(resourceId)
                .orElseThrow(() -> new AppException(ErrorCode.RESOURCE_NOT_FOUND));

        // Can not generate signed url from folder
        if (resource.getResourceType().equalsIgnoreCase(TypeResource.FOLDER.getValue())) {
            throw new AppException(ErrorCode.RESOURCE_TYPE_INVALID);
        }

        return cloudinaryService.generateUrl(resource.getPublicId(), resource.getResourceType());
    }
}
