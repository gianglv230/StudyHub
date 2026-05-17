package com.studyhub.studyhub_api.dto.request.user_account;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateMyStudentUserAccountRequest {
    String avatar;
}
