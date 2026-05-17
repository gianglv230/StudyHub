package com.studyhub.studyhub_api.dto.request.user_account;

public record UserAccountFilterRequest (
        Integer id,
        String fullname,
        String username,
        String status,
        String email,
        String phone,
        String role
){
}
