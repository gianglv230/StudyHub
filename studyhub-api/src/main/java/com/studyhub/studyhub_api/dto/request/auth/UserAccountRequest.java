package com.studyhub.studyhub_api.dto.request.auth;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class UserAccountRequest {
    @Size(min = 6, max = 40, message = "USERNAME_INVALID")
    @NotNull
    private String username;

    @Size(min = 8, max = 40, message = "PASSWORD_INVALID")
    @NotNull
    private String password;
}