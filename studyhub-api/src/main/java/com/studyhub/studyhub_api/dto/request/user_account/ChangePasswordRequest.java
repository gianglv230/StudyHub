package com.studyhub.studyhub_api.dto.request.user_account;

public record ChangePasswordRequest(
        Integer id,
        String newPassword
) {
}
