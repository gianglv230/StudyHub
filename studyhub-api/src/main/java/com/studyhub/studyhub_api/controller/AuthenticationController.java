package com.studyhub.studyhub_api.controller;

import com.studyhub.studyhub_api.dto.request.auth.UserAccountRequest;
import com.studyhub.studyhub_api.dto.response.ApiResponse;
import com.studyhub.studyhub_api.dto.response.auth.AuthenticationResponse;
import com.studyhub.studyhub_api.service.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@Tag(name = "Authentication Controller")
public class AuthenticationController {
    // Service handling authentication logic
    private final AuthenticationService authenticationService;

    /**
     * Authenticates the user and returns a JWT token.
     *
     * @param {LoginRequest} loginRequest - the login credentials (username & password)
     * @return {ApiResponse<AuthenticationResponse>} - an ApiResponse containing the AuthenticationResponse with JWT and related info
     */
    @Operation(summary = "Get token", description = "API login")
    @PostMapping("/token")
    ApiResponse<AuthenticationResponse> authentication(@Valid @RequestBody UserAccountRequest userAccountRequest) {
        return ApiResponse.<AuthenticationResponse>builder()
                .data(authenticationService.authenticate(userAccountRequest))
                .build();
    }
}
