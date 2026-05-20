package com.studyhub.studyhub_api.service.cloudinary.impl;

import com.cloudinary.Cloudinary;
import com.studyhub.studyhub_api.dto.response.CloudinaryResponse;
import com.studyhub.studyhub_api.enums.FileAccessType;
import com.studyhub.studyhub_api.exception.AppException;
import com.studyhub.studyhub_api.exception.ErrorCode;
import com.studyhub.studyhub_api.service.cloudinary.CloudinaryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class CloudinaryServiceImpl implements CloudinaryService {
    Cloudinary cloudinary;

    /**
     * Folder name on Cloudinary
     */
    @Deprecated
    private static final String PRODUCT_FOLDER =
            "nhndev/product/";

    // resourceType: image, video, raw (pdf, doc, docx, zip ...)
    public CloudinaryResponse uploadFile(MultipartFile file, String publicId, String resourceType, FileAccessType accessType) throws IOException {
        Map<String, Object> options = new HashMap<>();
        options.put("public_id", publicId);
        options.put("resource_type", resourceType);
        options.put("type", accessType.getType());

        Map<String, Object> result = cloudinary.uploader()
                .upload(file.getInputStream(), options
                );

        String url = (String) result.get("secure_url");
        String publicIdResponse = (String) result.get("public_id");

        return CloudinaryResponse.builder()
                .publicId(publicIdResponse)
                .url(url)
                .build();
    }

    public void deleteFile(String publicId, String resourceType) throws IOException {
        // Delete file
        Map<String, Object> result = cloudinary.uploader().destroy(
                        publicId,
                        Map.of("resource_type", resourceType)
                );

        // Result
        String deleteResult = (String) result.get("result");
        if ("ok".equals(deleteResult)) return;

        // Fail
        log.error("Failed to delete file: {}", publicId);
        throw new AppException(ErrorCode.DELETE_FILE_FAIL);
    }

    // Generate auth url file
    public String generateUrl(String publicId, String resourceType) {

        return cloudinary.url()
                .resourceType(resourceType)
                .type("authenticated")
                .signed(true)
                .generate(publicId);
    }

    /**
     * Upload file to Cloudinary
     *
     * @param file     uploaded file from client
     * @param fileName generated file name
     * @return uploaded file information
     */
    @Deprecated
    public CloudinaryResponse uploadFile(
            final MultipartFile file,
            final String fileName
    ) {

        try {

            // Upload file to Cloudinary
            //
            // public_id example:
            // nhndev/product/avatar_20260519223010
            Map<String, Object> result = cloudinary.uploader()
                    .upload(file.getInputStream(), Map.of(
                            "public_id",
                            PRODUCT_FOLDER + fileName
                    )
            );

            String url = (String) result.get("secure_url");

            String publicId = (String) result.get("public_id");

            return CloudinaryResponse.builder()
                    .publicId(publicId)
                    .url(url)
                    .build();

        } catch (IOException e) {

            log.error("Failed to upload file to Cloudinary", e);
            throw new AppException(ErrorCode.UPLOAD_CLOUDINARY_FAIL);
        }
    }

    /**
     * Delete file from Cloudinary
     *
     * @param publicId cloudinary public id
     */
    @Deprecated
    public void deleteFile(String publicId) {

        try {

            /**
             * Delete file
             */
            Map<String, Object> result =
                    cloudinary.uploader().destroy(
                            publicId,
                            Map.of()
                    );

            /**
             * Cloudinary returns:
             * result = "ok"
             */
            String deleteResult =
                    (String) result.get("result");

            if (!"ok".equals(deleteResult)) {

                log.error(
                        "Failed to delete file: {}",
                        publicId
                );

                throw new RuntimeException(
                        "Failed to delete file"
                );
            }

        } catch (Exception e) {

            log.error(
                    "Cloudinary delete error",
                    e
            );

            throw new RuntimeException(
                    "Failed to delete file"
            );
        }
    }
}
