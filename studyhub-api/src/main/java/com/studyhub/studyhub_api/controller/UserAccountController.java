package com.studyhub.studyhub_api.controller;

import com.studyhub.studyhub_api.dto.response.ApiResponse;
import com.studyhub.studyhub_api.dto.response.user_account.UserAccountBasicResponse;
import com.studyhub.studyhub_api.service.user_account.UserAccountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user-account")
@Tag(name = "User Account Controller")
public class UserAccountController {
    private final UserAccountService userAccountService;

    @Operation(summary = "Get my info", description = "API my info")
    @GetMapping("/my-info")
    public ApiResponse<UserAccountBasicResponse> getMyUserAccount() {
        return ApiResponse.<UserAccountBasicResponse>builder()
                .data(userAccountService.getMyUserAccount())
                .build();
    }
}
