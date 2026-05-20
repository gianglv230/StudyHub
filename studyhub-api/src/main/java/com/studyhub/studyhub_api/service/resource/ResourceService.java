package com.studyhub.studyhub_api.service.resource;

import com.studyhub.studyhub_api.dto.request.resource.AddFolderResourceRequest;
import com.studyhub.studyhub_api.dto.request.resource.RenameFolderResourceRequest;
import com.studyhub.studyhub_api.dto.request.resource.UpdateResourceRequest;
import com.studyhub.studyhub_api.dto.request.resource.UploadResourceRequest;
import com.studyhub.studyhub_api.dto.response.resource.FileInfoResponse;
import com.studyhub.studyhub_api.dto.response.resource.FolderResourceResponse;

import java.io.IOException;

public interface ResourceService {
    FolderResourceResponse getFolders(Integer parentFolderId);
    Boolean addFolder(AddFolderResourceRequest request);
    Boolean renameFolder(RenameFolderResourceRequest request);
    Boolean deleteFolder(Integer folderId);

    Boolean uploadResource(UploadResourceRequest request) throws IOException;

    Boolean deleteResource(Integer resourceId) throws IOException;

    Boolean updateResource(UpdateResourceRequest request) throws IOException;

    FileInfoResponse getFileInfo(Integer resourceId);

    String getSignedUrl(Integer resourceId);
}
