package com.studyhub.studyhub_api.mapper;

import com.studyhub.studyhub_api.dto.request.user_account.AddUserAccountRequest;
import com.studyhub.studyhub_api.dto.request.user_account.UpdateMyUserAccountRequest;
import com.studyhub.studyhub_api.dto.request.user_account.UpdateUserAccountRequest;
import com.studyhub.studyhub_api.dto.response.enrollment.StudentInClassResponse;
import com.studyhub.studyhub_api.dto.response.user_account.AdminUserAccountBasicResponse;
import com.studyhub.studyhub_api.dto.response.user_account.UserAccountBasicResponse;
import com.studyhub.studyhub_api.model.UserAccount;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface UserAccountMapper {
    UserAccountBasicResponse toUserAccountBasicResponse(UserAccount userAccount);

    @Mappings({
        @Mapping(target = "createdBy", source = "createdBy"),
        @Mapping(target = "updatedBy", source = "updatedBy"),
    })
    AdminUserAccountBasicResponse toAdminUserAccountBasicResponse(UserAccount account, String createdBy, String updatedBy);

    UserAccount toUserAccount(AddUserAccountRequest addUserAccountRequest);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUserAccount(UpdateUserAccountRequest request, @MappingTarget UserAccount userAccount);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateMyUserAccount(UpdateMyUserAccountRequest request, @MappingTarget UserAccount userAccount);

    @Mappings({
            @Mapping(target = "enrollmentId", source = "enrollmentId"),
            @Mapping(target = "status", source = "status"),
            @Mapping(target = "numberOfPresents", source = "numberOfPresents"),
            @Mapping(target = "numberOfAbsents", source = "numberOfAbsents")
    })
    StudentInClassResponse toStudentInClassResponse(UserAccount userAccount, Integer numberOfPresents, Integer numberOfAbsents, Integer enrollmentId, String status);
}
