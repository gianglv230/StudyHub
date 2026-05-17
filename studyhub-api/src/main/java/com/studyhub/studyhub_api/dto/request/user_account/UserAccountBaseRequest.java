package com.studyhub.studyhub_api.dto.request.user_account;

import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@SuperBuilder
public class UserAccountBaseRequest {
    String firstName;
    String lastName;
    Boolean gender;
    LocalDate dateOfBirth;
    String email;
    String phone;
    String avatar;
}
