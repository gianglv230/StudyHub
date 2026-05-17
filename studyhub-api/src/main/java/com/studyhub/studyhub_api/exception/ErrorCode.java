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
    UNAUTHENTICATED(1006,"Unauthenticated", HttpStatus.UNAUTHORIZED), //401
    UNAUTHORIZED(1007,"You do not have permission", HttpStatus.FORBIDDEN), //403

    USER_NOT_EXISTED(1005,"User not existed", HttpStatus.NOT_FOUND),
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
    ;

    private int code;
    private String message;
    private HttpStatusCode statusCode;
}
