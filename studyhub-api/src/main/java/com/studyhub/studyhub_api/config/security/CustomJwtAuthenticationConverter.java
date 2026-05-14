package com.studyhub.studyhub_api.config.security;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

import java.util.Collection;

/**
 * CustomJwtAuthenticationConverter
 *
 * Purpose: Converts a JWT token into a Spring Security Authentication object.
 * This implementation extracts the user's ID and username from JWT claims
 * and maps them into a CustomUserDetails instance. It also configures how
 * JWT authorities (roles/permissions) are extracted.
 *
 * Modification:
 */
public class CustomJwtAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {
    // Converter to extract GrantedAuthorities from JWT claims
    private final JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter;

    /**
     * Constructor initializes the JwtGrantedAuthoritiesConverter with a custom
     * authority prefix and the claim name used to store roles/permissions.
     * By default:
     * - All roles will be prefixed with "ROLE_".
     * - The "scope" claim in JWT will be used for authorities.
     */
    public CustomJwtAuthenticationConverter() {
        this.jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        this.jwtGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");
        this.jwtGrantedAuthoritiesConverter.setAuthoritiesClaimName("scope");
    }

    /**
     * Converts a Jwt object into an Authentication token containing user details.
     * Currently, it only sets the ID and username, with an empty list of authorities.
     *
     * @param {JWT} jwt - the JWT object containing user claims
     * @return {AbstractAuthenticationToken} - an AbstractAuthenticationToken representing the authenticated user
     */
    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        String username = jwt.getSubject(); // "sub"
        Number idNumber = jwt.getClaim("id");
        Integer id = idNumber != null ? idNumber.intValue() : null;

        Collection<? extends GrantedAuthority> authorities = jwtGrantedAuthoritiesConverter.convert(jwt);

        CustomUserDetails principal = new CustomUserDetails(id, username, "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, jwt, authorities);
    }
}
