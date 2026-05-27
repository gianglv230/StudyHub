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

@UtilityClass
public class FileUploadUtil {

    /**
     * Max file size: 20MB
     */
    public static final long MAX_FILE_SIZE = 20 * 1024 * 1024;
//    public static final long MAX_VIDEO_FILE_SIZE = 2L * 1024 * 1024 * 1024; // 2GB
    public static final long MAX_VIDEO_FILE_SIZE = 512 * 1024 * 1024; // 512MB

    /**
     * Allowed image extensions
     */
    private static final Set<String> ALLOWED_FILE_EXTENSIONS = Set.of("jpg", "jpeg", "png", "mp4", "mov", "mp3", "wav", "pdf", "doc", "docx");

    /**
     * Allowed image content types
     */
    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
            // Image
            "image/jpeg",
            "image/png",

            // Video
            "video/mp4",
            "video/quicktime", // mov

            // Audio
            "audio/mpeg", // mp3
            "audio/wav",
            "audio/x-wav",

            // Document
            "application/pdf",

            // Word
            "application/msword", // doc
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" // docx
    );

    public static String detectType(MultipartFile file) {
        String contentType = file.getContentType();
        String name = file.getOriginalFilename();

        if (contentType != null) {
            if (contentType.startsWith("image/")) return "image";
            if (contentType.startsWith("video/")) return "video";
            if (contentType.startsWith("audio/")) return "video";
            if (contentType.equals("application/pdf")) return "raw";
        }

        if (name != null) {
            name = name.toLowerCase();
            if (name.endsWith(".jpg") || name.endsWith(".png") || name.endsWith(".jpeg")) return "image";
            if (name.endsWith(".mp4") || name.endsWith(".mov")) return "video";
            if (name.endsWith(".mp3") || name.endsWith(".wav")) return "video";
            if (name.endsWith(".pdf") || name.endsWith(".doc") || name.endsWith(".docx"))
                return "raw";
        }

        return "raw";
    }

    /**
     * Validate uploaded image file
     */
    public static void assertAllowedFile(MultipartFile file) {
        // Check null file
        if (file == null || file.isEmpty()) {
            throw new AppException(ErrorCode.FILE_REQUIRED);
        }

        // Check file size
        if (detectType(file).equals("video")) {
            // MAX 512MB
            if (file.getSize() > MAX_VIDEO_FILE_SIZE) {
                throw new AppException(ErrorCode.VIDEO_TOO_MAXSIZE);
            }
        } else {
            // Max 20MB
            if (file.getSize() > MAX_FILE_SIZE) {
                throw new AppException(ErrorCode.FILE_TOO_MAXSIZE);
            }
        }

        // Check filename
        // Get original file name
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.isBlank()) {
            throw new AppException(ErrorCode.FILE_REQUIRED);
        }

        // Get file extension
        String extension = FilenameUtils.getExtension(originalFilename).toLowerCase();

        // Validate extension
        if (!ALLOWED_FILE_EXTENSIONS.contains(extension)) {
            throw new AppException(ErrorCode.FILE_NOT_ALLOWED);
        }

        // Validate content type
        String contentType = file.getContentType();

        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType.toLowerCase())) {
            throw new AppException(ErrorCode.FILE_NOT_ALLOWED);
        }
    }

    /**
     * Allowed image extensions
     */
    @Deprecated
    private static final Set<String> ALLOWED_IMAGE_EXTENSIONS = Set.of("jpg", "jpeg", "png", "gif", "bmp");



    /**
     * File name datetime format
     */
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

    /**
     * Validate uploaded image file
     */
    @Deprecated
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

        baseName = baseName.length() > 50
                ? baseName.substring(0, 50)
                : baseName;

        // Current datetime
        String date = LocalDateTime.now().format(DATE_FORMATTER);

        // Random string to avoid duplicate names
        String uuid = UUID.randomUUID().toString().substring(0, 8);

        // File extension
        String extension = FilenameUtils.getExtension(originalFileName);

        // Final file name
//        return String.format("%s_%s_%s.%s", baseName, date, uuid, extension);
        return String.format("%s_%s_%s", baseName, date, uuid);
    }
}
