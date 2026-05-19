package com.studyhub.studyhub_api.util;

import com.studyhub.studyhub_api.exception.AppException;
import com.studyhub.studyhub_api.exception.ErrorCode;
import lombok.experimental.UtilityClass;
import org.apache.commons.io.FilenameUtils;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Set;
import java.util.UUID;

@Deprecated
@UtilityClass
public class FileUploadUtil {

    /**
     * Max file size: 20MB
     */
    public static final long MAX_FILE_SIZE = 20 * 1024 * 1024;
    public static final long MAX_VIDEO_FILE_SIZE = 2L * 1024 * 1024 * 1024; // 2GB

    /**
     * Allowed image extensions
     */
    private static final Set<String> ALLOWED_IMAGE_EXTENSIONS = Set.of("jpg", "jpeg", "png", "gif", "bmp");

    /**
     * Allowed image content types
     */
    private static final Set<String> ALLOWED_CONTENT_TYPES =
            Set.of(
                    "image/jpeg",
                    "image/png",
                    "image/gif",
                    "image/bmp"
            );

    /**
     * File name datetime format
     */
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

    /**
     * Validate uploaded image file
     */
    public static void assertAllowedImage(MultipartFile file) {

        // Check null file
        if (file == null || file.isEmpty()) {
            throw new AppException(ErrorCode.FILE_REQUIRED);
        }

        // Check file size
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new AppException(ErrorCode.FILE_TOO_MAXSIZE);
        }

        // Get original file name
        String originalFilename = file.getOriginalFilename();

        if (originalFilename == null || originalFilename.isBlank()) {
            throw new AppException(ErrorCode.FILE_REQUIRED);
        }

        // Get file extension
        String extension = FilenameUtils.getExtension(originalFilename).toLowerCase();

        // Validate extension
        if (!ALLOWED_IMAGE_EXTENSIONS.contains(extension)) {
            throw new RuntimeException("Only jpg, jpeg, png, gif, bmp files are allowed");
        }

        // Validate content type
        String contentType = file.getContentType();

        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType.toLowerCase())) {
            throw new RuntimeException("Invalid image content type");
        }
    }

    /**
     * Generate unique file name
     * <p>
     * Example:
     * avatar_20260519223010_a12bc34d.png
     */
    public static String generateFileName(String originalFileName) {

        // Remove extension from original name
        String baseName = FilenameUtils.removeExtension(originalFileName);

        // Replace spaces with underscore
        baseName = baseName.trim().replaceAll("\\s+", "_");

        // Current datetime
        String date = LocalDateTime.now().format(DATE_FORMATTER);

        // Random string to avoid duplicate names
        String uuid = UUID.randomUUID().toString().substring(0, 8);

        // File extension
        String extension = FilenameUtils.getExtension(originalFileName);

        // Final file name
        return String.format("%s_%s_%s.%s", baseName, date, uuid, extension);
    }
}
