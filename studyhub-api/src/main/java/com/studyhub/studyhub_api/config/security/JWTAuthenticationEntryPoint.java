package com.studyhub.studyhub_api.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.studyhub.studyhub_api.dto.response.ApiResponse;
import com.studyhub.studyhub_api.exception.ErrorCode;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

/**
 * JWTAuthenticationEntryPoint
 *
 * Purpose: Custom implementation of Spring Security's AuthenticationEntryPoint
 * to handle unauthorized access attempts (HTTP 401 Unauthenticated).
 * When a user tries to access a protected resource without valid authentication,
 * this entry point returns a standardized JSON error response.
 *
 * Modification:
 */
@Slf4j
public class JWTAuthenticationEntryPoint implements AuthenticationEntryPoint {

    /**
     * Handles unauthenticated requests by returning a JSON response
     * with error details instead of redirecting to a login page.
     *
     * @param {HttpServletRequest} request              - the incoming HTTP request
     * @param {HttpServletResponse} response            - the HTTP response to be sent
     * @param {AuthenticationException} authException   - the exception indicating authentication failure
     * @throws IOException      if an input/output error occurs while writing the response
     * @throws ServletException if a servlet-specific error occurs
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException, ServletException {

        // Use predefined error code for unauthenticated access
        ErrorCode errorCode = ErrorCode.UNAUTHENTICATED;

        // Set HTTP status code and response content type
        response.setStatus(errorCode.getStatusCode().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        // Create a standardized API response object
        ApiResponse<?> apiResponse = ApiResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();

        // ObjectMapper is used to serialize the response object into JSON
        ObjectMapper mapper = new ObjectMapper();

        // Write the JSON error response to the output stream
        response.getWriter().write(mapper.writeValueAsString(apiResponse));
        response.flushBuffer();
    }
}
