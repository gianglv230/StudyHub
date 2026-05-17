package com.studyhub.studyhub_api.dto.response.user_account;

import java.time.LocalDate;

public record AdminUserAccountBasicResponse(
        Integer id,
        String firstName,
        String lastName,
        Boolean gender,
        LocalDate dateOfBirth,
        String email,
        String phone,
        String hometown,
        String address,
        String avatar,
        String role
) {
}
