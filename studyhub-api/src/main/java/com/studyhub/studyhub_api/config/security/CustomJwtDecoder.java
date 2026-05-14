package com.studyhub.studyhub_api.config.security;

import com.nimbusds.jwt.SignedJWT;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Component;

import java.text.ParseException;

/**
 * CustomJwtDecoder
 *
 * Purpose: A custom implementation of Spring Security's JwtDecoder
 * to parse and validate JWT tokens using the Nimbus library.
 *
 * Features:
 * - Parses a JWT string into a SignedJWT object.
 * - Extracts claims, headers, and validity period from the token.
 * - Converts the parsed token into Spring Security's Jwt object.
 * - Throws a JwtException for invalid or malformed tokens.
 *
 * Modification:
 */
@Component
public class CustomJwtDecoder implements JwtDecoder {

    /**
     * Decodes and parses the provided JWT token.
     *
     * @param {String} token - the JWT token string
     * @return {Jwt} - a Jwt object containing the token's claims, headers, and metadata
     * @throws JwtException if the token is invalid or cannot be parsed
     */
    @Override
    public Jwt decode(String token) throws JwtException {
        try {
            // Parse the token into a SignedJWT object
            SignedJWT signedJWT = SignedJWT.parse(token);

            // Build and return a Spring Security Jwt object
            return new Jwt(token,
                    signedJWT.getJWTClaimsSet().getIssueTime().toInstant(),
                    signedJWT.getJWTClaimsSet().getExpirationTime().toInstant(),
                    signedJWT.getHeader().toJSONObject(),
                    signedJWT.getJWTClaimsSet().getClaims()
            );

        } catch (ParseException e) {
            // Token format is invalid or cannot be parsed
            throw new JwtException("Invalid token");
        }
    }
}
