package com.studyhub.studyhub_api.service.user_account;

import java.util.List;
import java.util.Map;

public interface UserAccountService {
    Map<Integer, String> getUserAccountMap(List<Integer> ids);
}
