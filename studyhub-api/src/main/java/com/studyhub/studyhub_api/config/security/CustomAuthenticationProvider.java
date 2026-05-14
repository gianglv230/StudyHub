//package com.studyhub.studyhub_api.config.security;
//
//import com.studyhub.studyhub_api.service.AuthenticationService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.security.authentication.AuthenticationProvider;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.stereotype.Component;
//
//import java.util.Collection;
//import java.util.List;
//
///**
// * CustomAuthenticationProvider
// *
// * Purpose: Custom implementation of Spring Security's AuthenticationProvider
// * to authenticate users based on their granted actions/permissions retrieved
// * from the ActionService. This provider maps action information to GrantedAuthorities
// * used by Spring Security for authorization decisions.
// *
// * Modification:
// */
//@Component
//@RequiredArgsConstructor
//@Slf4j
//public class CustomAuthenticationProvider implements AuthenticationProvider {
//    // Service to retrieve user action/permission information
//    private final AuthenticationService authenticationService;
//
//    /**
//     * Performs authentication by mapping the authenticated user's action information
//     * to GrantedAuthority objects.
//     *
//     * @param {Authentication} authentication - the authentication request object containing principal and credentials
//     * @return {Authentication} - a fully authenticated Authentication object including granted authorities
//     * @throws AuthenticationException if authentication fails
//     */
//    @Override
//    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
//        // Extract user details from the provided Authentication object
//        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
//
//        // Retrieve action/permission information for the given user
//        String role = authenticationService.getRoleByUsername(customUserDetails.getUsername());
//
//        // Convert role string to Spring Security GrantedAuthority objects
//        Collection<? extends GrantedAuthority> authorities =
//                List.of(new SimpleGrantedAuthority("ROLE_" + role));
//
////        log.info(actionInfo.getActionInfo().toString());
//
//        // Return an authenticated token containing the user details and authorities
//        return new UsernamePasswordAuthenticationToken(
//                customUserDetails,
//                null,
//                authorities
//        );
//
//    }
//
//    @Override
//    public boolean supports(Class<?> authentication) {
//        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
//    }
//}
