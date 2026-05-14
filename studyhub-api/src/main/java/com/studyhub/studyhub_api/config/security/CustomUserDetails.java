package com.studyhub.studyhub_api.config.security;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@AllArgsConstructor
@Getter
@ToString
public class CustomUserDetails implements UserDetails {
    private final Integer id;
    private final String username;
    private final String password;
    private final Collection<? extends GrantedAuthority> authorities;
}
