package com.studyhub.studyhub_api.service.auth.impl;

import com.nimbusds.jose.JOSEException;
import com.studyhub.studyhub_api.dto.request.auth.IntrospectRequest;
import com.studyhub.studyhub_api.dto.request.auth.UserAccountRequest;
import com.studyhub.studyhub_api.dto.response.auth.AuthenticationResponse;
import com.studyhub.studyhub_api.dto.response.auth.IntrospectResponse;
import com.studyhub.studyhub_api.dto.response.auth.RefreshAccessTokenResponse;
import com.studyhub.studyhub_api.exception.AppException;
import com.studyhub.studyhub_api.exception.ErrorCode;
import com.studyhub.studyhub_api.model.UserAccount;
import com.studyhub.studyhub_api.repository.UserAccountRepository;
import com.studyhub.studyhub_api.service.auth.AuthenticationService;
import com.studyhub.studyhub_api.service.auth.JwtService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationServiceImpl implements AuthenticationService {
    UserAccountRepository userAccountRepository;
    JwtService jwtService;
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    /**
     * Kiểm tra đăng nhập
     *
     * @param userAccountRequest Tài khoản đăng nhập
     * @return Kết quả đăng nhập - token
     */
    @Override
    public AuthenticationResponse authenticate(UserAccountRequest userAccountRequest) {
        // username_not_existed
        var user = userAccountRepository.findByUsername(userAccountRequest.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // check password
        boolean authenticated = passwordEncoder.matches(userAccountRequest.getPassword(), user.getPassword());
        if (!authenticated) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        // check status
        if (!user.getStatus().equalsIgnoreCase("ACTIVE")) {
            throw new AppException(ErrorCode.ACCOUNT_LOCKED);
        }

        // Generate token
        var token = jwtService.generateToken(user, true);
        var refreshToken = jwtService.generateToken(user, false);

        return AuthenticationResponse.builder()
                .accessToken(token)
                .refreshToken(refreshToken)
                .id(user.getId())
                .fullname(user.getFullname())
                .role(user.getRole())
                .build();
    }

    /**
     * Kiểm tra Token đúng không
     *
     * @param introspectRequest Chứa token cần verify
     * @return Kết quả verify
     */
    @Override
    public IntrospectResponse introspect(IntrospectRequest introspectRequest)
            throws JOSEException, ParseException {
        var token = introspectRequest.token();
        boolean isValid = jwtService.verifyToken(token) != null;
        return new IntrospectResponse(isValid);
    }

    /**
     * Generate accessToken if refreshToken valid
     *
     * @param refreshToken
     * @return AccessToken
     * @throws ParseException
     * @throws JOSEException
     */
    @Override
    public RefreshAccessTokenResponse refreshAccessToken(String refreshToken) throws ParseException, JOSEException {
        var signJWT = jwtService.verifyToken(refreshToken);
        var username = signJWT.getJWTClaimsSet().getSubject();
        var user = userAccountRepository.findByUsername(username).orElseThrow(
                () -> new AppException(ErrorCode.UNAUTHENTICATED)
        );
        var token = jwtService.generateToken(user, true);
        return new RefreshAccessTokenResponse(token);
    }

    /**
     * Get role by username
     *
     * @param username
     * @return role
     */
    @Override
    public String getRoleByUsername(String username) {
        var user = userAccountRepository.findByUsername(username).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_EXISTED)
        );
        return user.getRole();
    }

    @Override
    public UserAccount getUserAccountByJwtToken() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        //Lấy được account
        UserAccount account = userAccountRepository.findByUsername(name)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return account;
    }
}
