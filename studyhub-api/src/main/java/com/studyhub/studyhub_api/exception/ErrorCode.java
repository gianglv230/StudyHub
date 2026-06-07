package com.studyhub.studyhub_api.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized exception", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Invalid message key", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(1006, "Unauthenticated", HttpStatus.UNAUTHORIZED), //401
    UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN), //403

    USER_NOT_EXISTED(1005, "User not existed", HttpStatus.NOT_FOUND),
    ACCOUNT_LOCKED(1019, "Tài khoản đã bị khóa.", HttpStatus.FORBIDDEN),

    INVALID_COURSE_TYPE(1030, "Invalid course type", HttpStatus.BAD_REQUEST),
    COURSE_NOT_EXISTED(1031, "Course not existed", HttpStatus.NOT_FOUND),
    CLASS_NOT_EXISTED(1032, "Class not existed", HttpStatus.NOT_FOUND),
    CLASS_LESSON_NOT_EXISTED(1033, "Class lesson not existed", HttpStatus.NOT_FOUND),
    OVER_TIME_UPDATE_ATTENDANCE(1034, "Over time update attendance", HttpStatus.BAD_REQUEST),
    INVOICE_NOT_EXISTED(1035, "Invoice not existed", HttpStatus.NOT_FOUND),
    CAN_NOT_DELETE(1036, "Can not delete", HttpStatus.BAD_REQUEST),
    MAX_STUDENTS_INVALID(1037, "Max students less than the current students", HttpStatus.BAD_REQUEST),
    CAN_NOT_TRANSITION(1038, "Can not transition", HttpStatus.BAD_REQUEST),
    CAN_NOT_OPEN(1039, "Can not open class", HttpStatus.BAD_REQUEST),
    CAN_NOT_CLOSE(1040, "Can not close class", HttpStatus.BAD_REQUEST),
    ENROLLMENT_EXISTED(1041, "Enrollment already existed", HttpStatus.CONFLICT),
    ENROLLMENT_NOT_EXISTED(1042, "Enrollment not existed", HttpStatus.CONFLICT),
    FOLDER_HAS_CHILD(1043, "Folder has child", HttpStatus.CONFLICT),
    FILE_REQUIRED(1044, "File required", HttpStatus.BAD_REQUEST),
    FILE_TOO_MAXSIZE(1045, "Max file size is 20MB", HttpStatus.BAD_REQUEST),
    VIDEO_TOO_MAXSIZE(1046, "Max video file size is 2GB", HttpStatus.BAD_REQUEST),
    UPLOAD_CLOUDINARY_FAIL(1047, "Upload cloudinary failed", HttpStatus.BAD_REQUEST),
    DELETE_FILE_FAIL(1048, "Failed to delete file", HttpStatus.BAD_REQUEST),
    FILE_NOT_ALLOWED(1049, "Only jpg, jpeg, png, mp4, mov, mp3, wav, pdf, doc, docx files are allowed", HttpStatus.BAD_REQUEST),
    RESOURCE_TYPE_INVALID(1050, "Resource type is invalid", HttpStatus.BAD_REQUEST),
    RESOURCE_NOT_FOUND(1051, "Resource not found", HttpStatus.NOT_FOUND),

    PASSWORD_INVALID(1052, "Password invlaid", HttpStatus.BAD_REQUEST),
    SLUG_EXISTED(1053, "Slug existed", HttpStatus.CONFLICT),
    TRANSFER_FAIL(1054, "Transfer fail because of invalid class", HttpStatus.BAD_REQUEST),
    DO_NOT_SAME_COURSE(1055, "Don't same course", HttpStatus.BAD_REQUEST),
    CLASS_FULL(1056, "Class full", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1057, "Username existed", HttpStatus.BAD_REQUEST),
    PAYOS_FAIL(1058, "Connect PayOS fail", HttpStatus.BAD_REQUEST),

    PAYMENT_LINK_ALREADY_EXISTS(1059, "Hãy quay lại sau 10 phút nữa", HttpStatus.BAD_REQUEST),
    ;

    private int code;
    private String message;
    private HttpStatusCode statusCode;
}
