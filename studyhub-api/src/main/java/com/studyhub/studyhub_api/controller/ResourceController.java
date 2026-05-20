package com.studyhub.studyhub_api.controller;

import com.studyhub.studyhub_api.dto.request.resource.AddFolderResourceRequest;
import com.studyhub.studyhub_api.dto.request.resource.RenameFolderResourceRequest;
import com.studyhub.studyhub_api.dto.request.resource.UpdateResourceRequest;
import com.studyhub.studyhub_api.dto.request.resource.UploadResourceRequest;
import com.studyhub.studyhub_api.dto.response.ApiResponse;
import com.studyhub.studyhub_api.dto.response.invoice.InvoiceCardResponse;
import com.studyhub.studyhub_api.dto.response.resource.FolderResourceResponse;
import com.studyhub.studyhub_api.service.resource.ResourceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/resource")
@Tag(name = "Resource Controller")
public class ResourceController {
    private final ResourceService resourceService;

    @Operation(summary = "Get folders of user", description = "API get folders of user")
    @GetMapping("/folder")
    public ApiResponse<FolderResourceResponse> getMyFolders(
            @RequestParam(value = "id", required = false) Integer id
    ){
        return ApiResponse.<FolderResourceResponse>builder()
                .data(resourceService.getFolders(id))
                .build();
    }

    @Operation(summary = "Add folder", description = "API add folder")
    @PostMapping("/folder")
    public ApiResponse<Boolean> addFolder(
            @RequestBody AddFolderResourceRequest request
            ){
        return ApiResponse.<Boolean>builder()
                .data(resourceService.addFolder(request))
                .build();
    }

    @Operation(summary = "Rename folder", description = "API rename folder")
    @PutMapping("/folder")
    public ApiResponse<Boolean> renameFolder(
            @RequestBody RenameFolderResourceRequest request
    ){
        return ApiResponse.<Boolean>builder()
                .data(resourceService.renameFolder(request))
                .build();
    }

    @Operation(summary = "Delete folder", description = "API delete folder")
    @DeleteMapping("/folder/{id}")
    public ApiResponse<Boolean> deleteFolder(
            @PathVariable Integer id
    ){
        return ApiResponse.<Boolean>builder()
                .data(resourceService.deleteFolder(id))
                .build();
    }

    @Operation(summary = "API get file info", description = "API get file info")
    @GetMapping(value = "/file/{resourceId}")
    public ApiResponse<?> getFileResourceInfo(@PathVariable Integer resourceId) {
        return ApiResponse.builder()
                .data(resourceService.getFileInfo(resourceId))
                .build();
    }

    @Operation(summary = "Upload file", description = "API upload file")
    @PostMapping(value = "/file", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<?> uploadFile(
            @Valid @ModelAttribute UploadResourceRequest request
            ) throws IOException {
        return ApiResponse.builder()
                .data(resourceService.uploadResource(request))
                .build();
    }

    @Operation(summary = "Update file", description = "API update file")
    @PutMapping(value = "/file", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<?> updateFile(
            @Valid @ModelAttribute UpdateResourceRequest request
    ) throws IOException {
        return ApiResponse.builder()
                .data(resourceService.updateResource(request))
                .build();
    }

    @Operation(summary = "Delete file", description = "API delete file")
    @DeleteMapping(value = "/file/{resourceId}")
    public ApiResponse<?> deleteFile(
            @PathVariable Integer resourceId
    ) throws IOException {
        return ApiResponse.builder()
                .data(resourceService.deleteResource(resourceId))
                .build();
    }

    @Operation(summary = "Get signed", description = "API get signed")
    @GetMapping(value = "/url/{resourceId}")
    public ApiResponse<?> getSignedUrl(@PathVariable Integer resourceId) {
        return ApiResponse.builder()
                .data(resourceService.getSignedUrl(resourceId))
                .build();
    }
}
