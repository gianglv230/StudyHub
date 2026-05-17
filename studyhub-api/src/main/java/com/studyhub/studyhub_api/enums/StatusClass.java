package com.studyhub.studyhub_api.enums;

import com.studyhub.studyhub_api.exception.AppException;
import com.studyhub.studyhub_api.exception.ErrorCode;

public enum StatusClass {
    UPCOMING,
    ONGOING,
    FINISHED,
    CANCELED;

    public StatusClass next() {
        return switch (this) {
            case UPCOMING -> ONGOING;
            case ONGOING -> FINISHED;
            default -> throw new AppException(ErrorCode.CAN_NOT_TRANSITION);
        };
    }

    public static StatusClass from(String value) {
        try {
            return StatusClass.valueOf(value.toUpperCase());
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid status: " + value);
        }
    }

}
