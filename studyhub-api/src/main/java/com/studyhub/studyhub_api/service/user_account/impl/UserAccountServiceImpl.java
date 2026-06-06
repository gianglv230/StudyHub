package com.studyhub.studyhub_api.service.user_account.impl;

import com.studyhub.studyhub_api.dto.request.user_account.*;
import com.studyhub.studyhub_api.dto.response.PageResponse;
import com.studyhub.studyhub_api.dto.response.user_account.AdminUserAccountBasicResponse;
import com.studyhub.studyhub_api.dto.response.user_account.UserAccountBasicResponse;
import com.studyhub.studyhub_api.dto.response.user_account.UserSimpleProjection;
import com.studyhub.studyhub_api.enums.FileAccessType;
import com.studyhub.studyhub_api.enums.Role;
import com.studyhub.studyhub_api.enums.UserAccountStatus;
import com.studyhub.studyhub_api.exception.AppException;
import com.studyhub.studyhub_api.exception.ErrorCode;
import com.studyhub.studyhub_api.mapper.UserAccountMapper;
import com.studyhub.studyhub_api.model.UserAccount;
import com.studyhub.studyhub_api.repository.ClassRepository;
import com.studyhub.studyhub_api.repository.EnrollmentRepository;
import com.studyhub.studyhub_api.repository.UserAccountRepository;
import com.studyhub.studyhub_api.repository.specification.UserAccountSpecification;
import com.studyhub.studyhub_api.service.auth.AuthenticationService;
import com.studyhub.studyhub_api.service.cloudinary.CloudinaryService;
import com.studyhub.studyhub_api.service.user_account.UserAccountService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class UserAccountServiceImpl implements UserAccountService {
    AuthenticationService authService;
    UserAccountRepository userAccountRepository;
    ClassRepository classRepository;
    EnrollmentRepository enrollmentRepository;
    UserAccountMapper userAccountMapper;
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    CloudinaryService cloudinaryService;

    private static final Integer MAX_ITEM = 100;

    @Override
    public Map<Integer, String> getUserAccountMap(List<Integer> ids) {
        List<UserSimpleProjection> userSimpleProjections = userAccountRepository.findAllSimpleProjectionsByIds(ids);
        return userSimpleProjections.stream()
                .collect(Collectors.toMap(
                        UserSimpleProjection::getId,
                        UserSimpleProjection::getFullname
                ));
    }

    @Override
    public UserAccountBasicResponse getMyUserAccount() {
        UserAccount userAccount = authService.getUserAccountByJwtToken();
        return userAccountMapper.toUserAccountBasicResponse(userAccount);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public PageResponse<UserAccountBasicResponse> filterUserAccounts(UserAccountFilterRequest request, Integer page) {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(page - 1, MAX_ITEM);

        Specification<UserAccount> spec = UserAccountSpecification.filter(request);
        var pageData = userAccountRepository.findAll(spec, pageable);

        return PageResponse.<UserAccountBasicResponse>builder()
                .currentPage(page)
                .pageSize(pageData.getSize())
                .totalPages(pageData.getTotalPages())
                .totalElements(pageData.getTotalElements())
                .data(pageData.getContent().stream().map(userAccountMapper::toUserAccountBasicResponse).toList())
                .build();
    }

    // Mapper
    private AdminUserAccountBasicResponse toAdminUserAccountBasicResponse(UserAccount account) {
        var createdById = account.getCreatedBy();
        var updatedById = account.getUpdatedBy();

        if (updatedById != null && createdById != null) {
            Map<Integer, String> userMap = getUserAccountMap(List.of(createdById, updatedById));
            return userAccountMapper.toAdminUserAccountBasicResponse(account, userMap.get(createdById), userMap.get(updatedById));
        }

        return userAccountMapper.toAdminUserAccountBasicResponse(account, null, null);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public AdminUserAccountBasicResponse getUserAccount(Integer id) {
        UserAccount account = userAccountRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return this.toAdminUserAccountBasicResponse(account);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public AdminUserAccountBasicResponse addUserAccount(AddUserAccountRequest request) throws IOException {
        if (userAccountRepository.existsByUsernameEqualsIgnoreCase(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        UserAccount account = userAccountMapper.toUserAccount(request);
        account.setStartDate(LocalDate.now());
        account.setStatus(UserAccountStatus.ACTIVE.name());
        account.setPassword(passwordEncoder.encode(request.getPassword().trim()));

        if (request.getAvatar() != null) {
            var response = cloudinaryService.uploadFile(request.getAvatar(), "avatar/" + UUID.randomUUID(), "image", FileAccessType.PUBLIC);
            account.setAvatar(response.getUrl());
            account.setPublicId(response.getPublicId());
        }

        userAccountRepository.save(account);
        return this.toAdminUserAccountBasicResponse(account);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public AdminUserAccountBasicResponse updateUserAccount(UpdateUserAccountRequest request) throws IOException {
        UserAccount account = userAccountRepository.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        userAccountMapper.updateUserAccount(request, account);

        if (request.getAvatar() != null) {
            if (account.getPublicId() != null) {
                cloudinaryService.deleteFile(account.getPublicId(), "image");
            }
            var response = cloudinaryService.uploadFile(request.getAvatar(), "avatar/" + UUID.randomUUID(), "image", FileAccessType.PUBLIC);
            account.setAvatar(response.getUrl());
            account.setPublicId(response.getPublicId());
        }

        userAccountRepository.save(account);
        return this.toAdminUserAccountBasicResponse(account);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public Boolean lockUserAccount(Integer id) {
        UserAccount account = userAccountRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        account.setStatus(UserAccountStatus.INACTIVE.name());
        account.setEndDate(LocalDate.now());
        userAccountRepository.save(account);
        return true;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public Boolean unLockUserAccount(Integer id) {
        UserAccount account = userAccountRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        account.setStatus(UserAccountStatus.ACTIVE.name());
        account.setEndDate(null);
        userAccountRepository.save(account);
        return true;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public Boolean deleteUserAccount(Integer id) throws IOException {
        UserAccount account = userAccountRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Integer accountId = account.getId();

        if (account.getRole().equals(Role.ADMIN.name())) {
            throw new AppException(ErrorCode.CAN_NOT_DELETE);
        }

        if (account.getRole().equalsIgnoreCase(Role.STUDENT.name())) {
            if (enrollmentRepository.existsByStudentId(accountId)) {
                throw new AppException(ErrorCode.CAN_NOT_DELETE);
            }
        }

        if (account.getRole().equalsIgnoreCase(Role.TEACHER.name())) {
            if (classRepository.existsByTeacherId(accountId)) {
                throw new AppException(ErrorCode.CAN_NOT_DELETE);
            }
        }

        if (account.getPublicId() != null) {
            cloudinaryService.deleteFile(account.getPublicId(), "image");
        }

        userAccountRepository.delete(account);
        return true;
    }

    @Override
    public Boolean changePassword(ChangePasswordRequest request) {
        UserAccount account = authService.getUserAccountByJwtToken();
        if (!passwordEncoder.matches(request.oldPassword(), account.getPassword())) {
            throw new AppException(ErrorCode.PASSWORD_INVALID);
        }
        account.setPassword(passwordEncoder.encode(request.newPassword().trim()));
        userAccountRepository.save(account);
        return true;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public Boolean resetPassword(ChangePasswordRequest request) {
        UserAccount account = userAccountRepository.findById(request.id())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        account.setPassword(passwordEncoder.encode(request.newPassword()));
        userAccountRepository.save(account);
        return true;
    }

    @Override
    public UserAccountBasicResponse updateMyStudentUserAccount(UpdateMyStudentUserAccountRequest request) {
        UserAccount account = authService.getUserAccountByJwtToken();
        account.setAddress(request.getAvatar());
        userAccountRepository.save(account);
        return userAccountMapper.toUserAccountBasicResponse(account);
    }

    @PreAuthorize("hasAnyRole('TEACHER','ADMIN')")
    @Override
    public UserAccountBasicResponse updateMyUserAccount(UpdateMyUserAccountRequest request) throws IOException {
        UserAccount account = authService.getUserAccountByJwtToken();
        userAccountMapper.updateMyUserAccount(request, account);

        if (request.getAvatar() != null) {
            if (account.getPublicId() != null) {
                cloudinaryService.deleteFile(account.getPublicId(), "image");
            }
            var response = cloudinaryService.uploadFile(request.getAvatar(), "avatar/" + UUID.randomUUID(), "image", FileAccessType.PUBLIC);
            account.setAvatar(response.getUrl());
            account.setPublicId(response.getPublicId());
        }

        userAccountRepository.save(account);
        return userAccountMapper.toUserAccountBasicResponse(account);
    }
}
