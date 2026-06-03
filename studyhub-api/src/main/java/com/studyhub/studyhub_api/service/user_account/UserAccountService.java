package com.studyhub.studyhub_api.service.user_account;

import com.studyhub.studyhub_api.dto.request.user_account.*;
import com.studyhub.studyhub_api.dto.response.PageResponse;
import com.studyhub.studyhub_api.dto.response.user_account.AdminUserAccountBasicResponse;
import com.studyhub.studyhub_api.dto.response.user_account.UserAccountBasicResponse;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface UserAccountService {
    Map<Integer, String> getUserAccountMap(List<Integer> ids);
    UserAccountBasicResponse getMyUserAccount();

    PageResponse<UserAccountBasicResponse> filterUserAccounts(UserAccountFilterRequest request, Integer page);

    AdminUserAccountBasicResponse getUserAccount(Integer id);
    AdminUserAccountBasicResponse addUserAccount(AddUserAccountRequest request) throws IOException;
    AdminUserAccountBasicResponse updateUserAccount(UpdateUserAccountRequest request) throws IOException;
    Boolean lockUserAccount(Integer id);
    Boolean unLockUserAccount(Integer id);
    Boolean deleteUserAccount(Integer id) throws IOException;

    Boolean changePassword(ChangePasswordRequest request);
    Boolean resetPassword(ChangePasswordRequest request);

    UserAccountBasicResponse updateMyStudentUserAccount(UpdateMyStudentUserAccountRequest request);
    UserAccountBasicResponse updateMyUserAccount(UpdateMyUserAccountRequest request) throws IOException;
}
