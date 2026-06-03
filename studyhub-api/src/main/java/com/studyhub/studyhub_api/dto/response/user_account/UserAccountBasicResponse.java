package com.studyhub.studyhub_api.dto.response.user_account;

import java.time.Instant;
import java.time.LocalDate;

public record UserAccountBasicResponse(
        Integer id,
        String username,
        String firstName,
        String lastName,
        Boolean gender,
        LocalDate dateOfBirth,
        String email,
        String phone,
        String hometown,
        String address,
        String avatar,
        String role,
        LocalDate startDate,
        LocalDate endDate,
        Instant createdAt,
        String createdBy,
        Instant updateAt,
        String updatedBy
) {
}
