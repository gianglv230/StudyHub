package com.studyhub.studyhub_api.service.cloudinary.impl;

import com.cloudinary.Cloudinary;
import com.studyhub.studyhub_api.dto.response.CloudinaryResponse;
import com.studyhub.studyhub_api.exception.AppException;
import com.studyhub.studyhub_api.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@Deprecated
public class CloudinaryServiceImpl {
    Cloudinary cloudinary;

    /**
     * Folder name on Cloudinary
     */
    private static final String PRODUCT_FOLDER =
            "nhndev/product/";

    /**
     * Upload file to Cloudinary
     *
     * @param file     uploaded file from client
     * @param fileName generated file name
     * @return uploaded file information
     */
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
