package com.studyhub.studyhub_api.dto.request.user_account;

import lombok.*;
import lombok.experimental.FieldNameConstants;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@FieldNameConstants(level = AccessLevel.PRIVATE)
public class UpdateUserAccountRequest extends UserAccountBaseRequest {
    Integer id;
}
