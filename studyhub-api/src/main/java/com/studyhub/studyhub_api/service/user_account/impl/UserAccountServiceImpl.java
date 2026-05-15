package com.studyhub.studyhub_api.service.user_account.impl;

import com.studyhub.studyhub_api.dto.response.user_account.UserSimpleProjection;
import com.studyhub.studyhub_api.repository.UserAccountRepository;
import com.studyhub.studyhub_api.service.user_account.UserAccountService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class UserAccountServiceImpl implements UserAccountService {
    UserAccountRepository userAccountRepository;

    @Override
    public Map<Integer, String> getUserAccountMap(List<Integer> ids){
        List<UserSimpleProjection> userSimpleProjections = userAccountRepository.findAllSimpleProjectionsByIds(ids);
        return userSimpleProjections.stream()
                .collect(Collectors.toMap(
                        UserSimpleProjection::getId,
                        UserSimpleProjection::getFullname
                ));
    }
}
