package com.studyhub.studyhub_api.controller;

import com.studyhub.studyhub_api.dto.request.user_account.*;
import com.studyhub.studyhub_api.dto.response.ApiResponse;
import com.studyhub.studyhub_api.dto.response.PageResponse;
import com.studyhub.studyhub_api.dto.response.user_account.AdminUserAccountBasicResponse;
import com.studyhub.studyhub_api.dto.response.user_account.UserAccountBasicResponse;
import com.studyhub.studyhub_api.service.user_account.UserAccountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @Operation(summary = "Change password", description = "API change password")
    @PutMapping("/change-pwd")
    public ApiResponse<Boolean> changePwd(
            @RequestBody ChangePasswordRequest request
    ){
        return ApiResponse.<Boolean>builder()
                .data(userAccountService.changePassword(request))
                .build();
    }

    @Operation(summary = "Update user account for student", description = "API update user account for student")
    @PutMapping("/student/my-account")
    public ApiResponse<UserAccountBasicResponse> updateMyStudentUserAccount(
            @RequestBody UpdateMyStudentUserAccountRequest request
            ){
        return ApiResponse.<UserAccountBasicResponse>builder()
                .data(userAccountService.updateMyStudentUserAccount(request))
                .build();
    }

    @Operation(summary = "Update user account for admin / teacher", description = "API update user account for admin / teacher")
    @PutMapping("/auth/my-account")
    public ApiResponse<UserAccountBasicResponse> updateMyUserAccount(
            @RequestBody UpdateMyUserAccountRequest request
    ){
        return ApiResponse.<UserAccountBasicResponse>builder()
                .data(userAccountService.updateMyUserAccount(request))
                .build();
    }

    // ADMIN

    @Operation(summary = "Filter user account for Admin", description = "API filter user account for Admin")
    @GetMapping("/admin/filter")
    public ApiResponse<PageResponse<UserAccountBasicResponse>> filterAccount(
            @ModelAttribute UserAccountFilterRequest request,
            @RequestParam(defaultValue = "1", required = false) Integer page
    ) {
        return ApiResponse.<PageResponse<UserAccountBasicResponse>>builder()
                .data(userAccountService.filterUserAccounts(request, page))
                .build();
    }

    @Operation(summary = "Get user account info", description = "API get user account info")
    @GetMapping("/admin/{id}")
    public ApiResponse<AdminUserAccountBasicResponse> getUserAccount(
            @PathVariable Integer id
    ) {
        return ApiResponse.<AdminUserAccountBasicResponse>builder()
                .data(userAccountService.getUserAccount(id))
                .build();
    }

    @Operation(summary = "Add user account", description = "API add user account")
    @PostMapping("/admin")
    public ApiResponse<AdminUserAccountBasicResponse> addUserAccount(
            @RequestBody AddUserAccountRequest request
    ) {
        return ApiResponse.<AdminUserAccountBasicResponse>builder()
                .data(userAccountService.addUserAccount(request))
                .build();
    }

    @Operation(summary = "Update user account", description = "API update user account")
    @PutMapping("/admin")
    public ApiResponse<AdminUserAccountBasicResponse> updateUserAccount(
            @RequestBody UpdateUserAccountRequest request
            ) {
        return ApiResponse.<AdminUserAccountBasicResponse>builder()
                .data(userAccountService.updateUserAccount(request))
                .build();
    }

    @Operation(summary = "Delete user account", description = "API delete user account")
    @DeleteMapping("/admin/{id}")
    public ApiResponse<Boolean> delUserAccount(
            @PathVariable Integer id
    ) {
        return ApiResponse.<Boolean>builder()
                .data(userAccountService.deleteUserAccount(id))
                .build();
    }

    @Operation(summary = "Update user account", description = "API update user account")
    @PatchMapping("/admin/lock/{id}")
    public ApiResponse<Boolean> lockUserAccount(
            @PathVariable Integer id
    ) {
        return ApiResponse.<Boolean>builder()
                .data(userAccountService.lockUserAccount(id))
                .build();
    }

    @Operation(summary = "Update user account", description = "API update user account")
    @PatchMapping("/admin/unlock/{id}")
    public ApiResponse<Boolean> unLockUserAccount(
            @PathVariable Integer id
    ) {
        return ApiResponse.<Boolean>builder()
                .data(userAccountService.unLockUserAccount(id))
                .build();
    }

    @Operation(summary = "Reset pwd for user account", description = "API reset pwd for user account")
    @PatchMapping("/admin/reset-pwd")
    public ApiResponse<Boolean> resetPwdUserAccount(
            @RequestBody ChangePasswordRequest request
    ) {
        return ApiResponse.<Boolean>builder()
                .data(userAccountService.resetPassword(request))
                .build();
    }
}
