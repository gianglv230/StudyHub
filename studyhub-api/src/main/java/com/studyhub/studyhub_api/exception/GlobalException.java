package com.studyhub.studyhub_api.exception;

import com.studyhub.studyhub_api.dto.response.ApiResponse;
import com.studyhub.studyhub_api.dto.response.FieldErrorDetail;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;

/**
 * GlobalException
 *
 * Purpose: Centralized exception handler for the authentication service.
 * Captures and processes different types of exceptions thrown by controllers or services,
 * returning standardized API responses with appropriate HTTP status codes.
 *
 * Features:
 * - Handles uncategorized runtime exceptions.
 * - Handles application-specific exceptions (AppException).
 * - Handles validation errors from method arguments.
 * - Handles access denied (403) security exceptions.
 *
 * Modification:
 */
@Slf4j
@ControllerAdvice
public class GlobalException {

    /**
     * Function that handling runtime exception
     * @param {RuntimeException} e - runtime exception
     * @return {ResponseEntity} - detail error response
     */
    @ExceptionHandler(Exception.class)
    ResponseEntity<ApiResponse> handlingRuntimeException(RuntimeException e) {
        ErrorCode errorCode = ErrorCode.UNCATEGORIZED_EXCEPTION;

        ApiResponse apiResponse = ApiResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();

        return ResponseEntity
                .status(errorCode.getStatusCode())
                .body(apiResponse);
    }

    /**
     * Function that handling service layer exception
     * @param {AppException} e - defined exception
     * @return {ResponseEntity} - detail error response
     */
    @ExceptionHandler(AppException.class)
    ResponseEntity<ApiResponse> handlingAppException(AppException e) {
        ErrorCode errorCode = e.getErrorCode();
        return ResponseEntity
                .status(errorCode.getStatusCode())
                .body(
                        ApiResponse.builder()
                                .code(errorCode.getCode())
                                .message(errorCode.getMessage())
                                .build()
                );
    }

    /**
     * Function that handling method argument not valid exception
     * @param {MethodArgumentNotValidException} e - method argument not valid exception
     * @return {ResponseEntity} - detail error response
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse> handlingMethodArgumentNotValidException(MethodArgumentNotValidException e) {
//        String enumKey = e.getFieldError().getDefaultMessage();
        ErrorCode errorCode = ErrorCode.INVALID_KEY;

//        Map<String, Object> attributes = null;
//
//        try {
//            errorCode = ErrorCode.valueOf(enumKey);
//
//            var constraintViolation = e.getBindingResult()
//                    .getAllErrors().getFirst().unwrap(ConstraintViolation.class);
//
//            attributes = constraintViolation.getConstraintDescriptor().getAttributes();
//
//            log.info(attributes.toString());
//
//        } catch (IllegalArgumentException ex) {
//
//        }

        List<FieldErrorDetail> errors = e.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(err -> FieldErrorDetail.builder()
                        .field(err.getField())
                        .message(ErrorCode.valueOf(err.getDefaultMessage()).getMessage())
                        .build())
                .toList();

        ApiResponse apiResponse = ApiResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .error(errors)
                .build();

        return ResponseEntity
                .status(errorCode.getStatusCode())
                .body(apiResponse);
    }

    /**
     * Function that handling access denied exception (403)
     * @param {AccessDeniedException} e - access denied exception
     * @return {ResponseEntity} - detail error response
     */
    @ExceptionHandler(AccessDeniedException.class)
    ResponseEntity<ApiResponse> handlingAccessDeniedException(AccessDeniedException e) {
        ErrorCode errorCode = ErrorCode.UNAUTHORIZED;

        return ResponseEntity
                .status(errorCode.getStatusCode())
                .body(
                  ApiResponse.builder()
                          .code(errorCode.getCode())
                          .message(errorCode.getMessage())
                          .build()
                );
    }
}
