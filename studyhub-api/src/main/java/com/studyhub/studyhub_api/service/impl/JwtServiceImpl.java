package com.studyhub.studyhub_api.service.impl;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.studyhub.studyhub_api.exception.AppException;
import com.studyhub.studyhub_api.exception.ErrorCode;
import com.studyhub.studyhub_api.model.UserAccount;
import com.studyhub.studyhub_api.service.JwtService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Component
public class JwtServiceImpl implements JwtService {
    @NonFinal
    @Value("${jwt.signer-key}")
    protected String SIGNER_KEY;

    //Không cho vào Constructor
    @NonFinal
    @Value("${jwt.valid-duration}")
    protected long VALIDATION_DURATION;

    //Không cho vào Constructor
    @NonFinal
    @Value("${jwt.refreshable-duration}")
    protected long REFRESHABLE_DURATION;

    /**
     * Tạo JWT
     *
     * @param user          Tên tài khoản người dùng
     * @param isAcceesToken true - accessToken, false - refreshToken
     * @return Chuỗi token
     */
    @Override
    public String generateToken(UserAccount user, boolean isAcceesToken) {
        //Header Token
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        //Body Token

        long expiredTime = isAcceesToken
                ? Instant.now().plus(VALIDATION_DURATION, ChronoUnit.SECONDS).toEpochMilli()
                : Instant.now().plus(REFRESHABLE_DURATION, ChronoUnit.SECONDS).toEpochMilli();

        //subject: user đăng nhập
        //issuer: ai tạo
        //issueTime: thời gian tạo
        //expirationTime: thời gian hết hạn
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("StudyHub")
                .issueTime(new Date())
                .expirationTime(new Date(
                        expiredTime
                ))
                .jwtID(UUID.randomUUID().toString())
                .claim("id", user.getId())
                .claim("scope", user.getRole())
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        //Signature - Ở đây dùng khóa bí mật (dùng khóa bất đối xứng cũng được)
        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot create Token", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public SignedJWT verifyToken(String token) throws ParseException, JOSEException {
        JWSVerifier jwsVerifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        boolean valid = signedJWT.verify(jwsVerifier)
                && signedJWT.getJWTClaimsSet().getExpirationTime().after(new Date());

        if (!valid) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        return signedJWT;
    }
}
