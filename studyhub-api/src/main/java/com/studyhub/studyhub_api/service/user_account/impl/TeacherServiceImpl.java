package com.studyhub.studyhub_api.service.user_account.impl;

import com.studyhub.studyhub_api.dto.response.teacher.TeacherLiteResponse;
import com.studyhub.studyhub_api.enums.Role;
import com.studyhub.studyhub_api.enums.UserAccountStatus;
import com.studyhub.studyhub_api.model.UserAccount;
import com.studyhub.studyhub_api.repository.UserAccountRepository;
import com.studyhub.studyhub_api.service.user_account.TeacherService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class TeacherServiceImpl implements TeacherService {
    UserAccountRepository userAccountRepository;

    /**
     * Get teachers list for guest home
     *
     * @return teachers list
     */
    @Override
    public List<TeacherLiteResponse> getTeacherList() {
        List<UserAccount> userAccounts = userAccountRepository.findByRoleAndStatus(Role.TEACHER.name(), UserAccountStatus.ACTIVE.name());
        return userAccounts.stream()
                .map(userAccount -> new TeacherLiteResponse(userAccount.getId(), userAccount.getFullname(), userAccount.getAvatar()))
                .toList();
    }
}
