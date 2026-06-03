package com.studyhub.studyhub_api.dto.request.user_account;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateMyUserAccountRequest {
    String firstName;
    String lastName;
    Boolean gender;
    LocalDate dateOfBirth;
    String email;
    String hometown;
    String address;
    String phone;
    MultipartFile avatar;

}
