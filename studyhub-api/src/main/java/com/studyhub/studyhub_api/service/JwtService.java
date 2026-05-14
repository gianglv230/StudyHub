package com.studyhub.studyhub_api.service;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.SignedJWT;
import com.studyhub.studyhub_api.model.UserAccount;

import java.text.ParseException;

public interface JwtService {
    String generateToken(UserAccount user, boolean isAccessToken);
    SignedJWT verifyToken(String token) throws ParseException, JOSEException;
}
