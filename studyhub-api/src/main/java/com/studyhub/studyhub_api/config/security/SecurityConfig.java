package com.studyhub.studyhub_api.config.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

/**
 * SecurityConfig
 * <p>
 * Purpose: Configures Spring Security for the BidvCard service.
 * Uses JWT-based authentication with a custom decoder.
 * Defines which endpoints are public and which require authentication.
 * <p>
 * Features:
 * - Enables method-level security annotations (@PreAuthorize, @Secured, etc.).
 * - Configures HTTP security, including request authorization rules.
 * - Integrates a custom JWT decoder for parsing and validating tokens.
 * - Sets a custom authentication entry point for handling unauthorized access.
 * - Disables CSRF (since this is a stateless REST API).
 * <p>
 * Modification:
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

//    @Value("${jwt.signerKey}")
//    private String signerKey;

    private static final String[] GET_API_PUBLIC = {"/teacher/list",
            "/course/type/{type}", "/course/find", "/course/filter-option", "/course/filter", "/course/detail/**",
            "/class/filter", "/class/class-of-course/**", "/class/class-of-teacher/**", "/class/detail/**"};

    // Custom JWT decoder used to parse and validate incoming JWT tokens
    private final CustomJwtDecoder jwtDecoder;

    /**
     * Defines the Spring Security filter chain for HTTP requests.
     *
     * @param {HttpSecurity} httpSecurity - the HttpSecurity configuration object
     * @return {SecurityFilterChain} - the configured SecurityFilterChain
     * @throws Exception if there is an error in the configuration
     * @author Kieu Duc Thinh
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity, PermissionLoaderFilter jwtFilter) throws Exception {

        // Configure endpoint access rules
        httpSecurity.authorizeHttpRequests(request ->
                request
                        .requestMatchers(HttpMethod.POST, "/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, GET_API_PUBLIC).permitAll()
                        .anyRequest().authenticated());
//                        .anyRequest().permitAll());

        // Configure OAuth2 Resource Server with JWT authentication
        httpSecurity.oauth2ResourceServer(oauth2 ->
                oauth2
                        .jwt(jwtConfigurer -> {
                            jwtConfigurer.decoder(jwtDecoder);
                            jwtConfigurer
                                    .jwtAuthenticationConverter(jwtAuthenticationConverter())
                            ;
                        })
                        .authenticationEntryPoint(new JWTAuthenticationEntryPoint())
        );

        httpSecurity.csrf(AbstractHttpConfigurer::disable);

        // Tắt HTTP Basic Auth (hiện popup nhập user/pass)
        httpSecurity.httpBasic(AbstractHttpConfigurer::disable);

        httpSecurity.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }

    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);

        return jwtAuthenticationConverter;
    }

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        // Chỉ định nguồn gốc (Frontend)
        config.setAllowedOrigins(Arrays.asList(
                "http://localhost:4200"
        ));

        // Cho phép tất cả các method (GET, POST, PUT, DELETE, ...)
        config.addAllowedMethod("*");

        // Cho phép tất cả các header
        config.addAllowedHeader("*");

        // Cho phép gửi credentials như cookies, Authorization header
//        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }

//    @Bean
//    JwtDecoder jwtDecoder() {
//        SecretKeySpec secretKeySpec = new SecretKeySpec(signerKey.getBytes(), "HS512");
//        return NimbusJwtDecoder
//                .withSecretKey(secretKeySpec)
//                .macAlgorithm(MacAlgorithm.HS512)
//                .build();
//    }
}
