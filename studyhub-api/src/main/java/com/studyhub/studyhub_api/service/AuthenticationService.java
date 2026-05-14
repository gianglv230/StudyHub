package com.studyhub.studyhub_api.service;

import com.nimbusds.jose.JOSEException;
import com.studyhub.studyhub_api.dto.request.auth.IntrospectRequest;
import com.studyhub.studyhub_api.dto.request.auth.UserAccountRequest;
import com.studyhub.studyhub_api.dto.response.auth.AuthenticationResponse;
import com.studyhub.studyhub_api.dto.response.auth.IntrospectResponse;
import com.studyhub.studyhub_api.dto.response.auth.RefreshAccessTokenResponse;

import java.text.ParseException;

public interface AuthenticationService {
    AuthenticationResponse authenticate(UserAccountRequest userAccountRequest);
    IntrospectResponse introspect(IntrospectRequest introspectRequest) throws JOSEException, ParseException;
    RefreshAccessTokenResponse refreshAccessToken(String refreshToken) throws ParseException, JOSEException;
    String getRoleByUsername(String username);
}
