package com.studyhub.studyhub_api.dto.request.auth;

import jakarta.validation.constraints.NotBlank;

public record IntrospectRequest(
        @NotBlank(message = "TOKEN_INVALID") String token
) {}
