package com.studyhub.studyhub_api.mapper;

import com.studyhub.studyhub_api.dto.response.user_account.UserAccountBasicResponse;
import com.studyhub.studyhub_api.model.UserAccount;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserAccountMapper {
    UserAccountBasicResponse toUserAccountBasicResponse(UserAccount userAccount);
}
