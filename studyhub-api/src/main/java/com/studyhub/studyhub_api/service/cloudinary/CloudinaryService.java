package com.studyhub.studyhub_api.service.cloudinary;

import com.studyhub.studyhub_api.dto.response.CloudinaryResponse;
import com.studyhub.studyhub_api.enums.FileAccessType;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface CloudinaryService {
    CloudinaryResponse uploadFile(MultipartFile file, String publicId, String resourceType, FileAccessType accessType) throws IOException;
    void deleteFile(String publicId, String resourceType) throws IOException;
    String generateUrl(String publicId, String resourceType);
}
