package com.studyhub.studyhub_api.service.user_account;

import com.studyhub.studyhub_api.dto.response.user_account.UserAccountBasicResponse;

import java.util.List;
import java.util.Map;

public interface UserAccountService {
    Map<Integer, String> getUserAccountMap(List<Integer> ids);
    UserAccountBasicResponse getMyUserAccount();
}
