package com.studyhub.studyhub_api.dto.response.auth;

import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationResponse {
    String accessToken;
    String refreshToken;

    int id;
    String fullname;
    String role;
}
