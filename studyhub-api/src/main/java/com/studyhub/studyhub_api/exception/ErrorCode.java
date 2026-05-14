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
    ;

    private int code;
    private String message;
    private HttpStatusCode statusCode;
}
