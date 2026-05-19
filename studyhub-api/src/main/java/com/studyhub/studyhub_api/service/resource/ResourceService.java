package com.studyhub.studyhub_api.service.resource;

import com.studyhub.studyhub_api.dto.request.resource.AddFolderResourceRequest;
import com.studyhub.studyhub_api.dto.request.resource.RenameFolderResourceRequest;
import com.studyhub.studyhub_api.dto.response.resource.FolderResourceResponse;

public interface ResourceService {
    FolderResourceResponse getFolders(Integer parentFolderId);
    Boolean addFolder(AddFolderResourceRequest request);
    Boolean renameFolder(RenameFolderResourceRequest request);
    Boolean deleteFolder(Integer folderId);
}
