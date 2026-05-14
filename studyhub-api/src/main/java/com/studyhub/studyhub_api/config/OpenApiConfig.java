package com.studyhub.studyhub_api.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * OpenApiConfig
 *
 * Purpose: Configures OpenAPI/Swagger documentation for the authentication service.
 * This configuration sets up API metadata, server details, and JWT bearer token security.
 *
 * Modification:
 */
@Configuration
public class OpenApiConfig {

    /**
     * Configures the OpenAPI specification for the service.
     *
     * @param {String} title      the API title (loaded from configuration)
     * @param {String} version    the API version (loaded from configuration)
     * @param {String} serverUrl  the base server URL for the API
     * @param {String} serverName the description or display name of the server
     * @return {OpenAPI} - an OpenAPI object with metadata, server details, and security configuration
     *
     * Features:
     * - Sets API title and version in documentation.
     * - Registers server information.
     * - Configures a bearer token (JWT) authentication scheme.
     * - Adds a global security requirement for JWT.
     */
    @Bean
    public OpenAPI openAPI(
            @Value("${open.api.title}") String title,
            @Value("${open.api.version}") String version,
            @Value("${open.api.serverUrl}") String serverUrl,
            @Value("${open.api.serverName}") String serverName
    ) {
        return new OpenAPI().info(new Info()
                    .title(title)
                    .version(version))
                .servers(List.of(new Server().url(serverUrl).description(serverName)))
                .components(
                        new Components()
                                .addSecuritySchemes(
                                        "bearerAuth",
                                        new SecurityScheme()
                                                .type(SecurityScheme.Type.HTTP)
                                                .scheme("bearer")
                                                .bearerFormat("JWT")
                                )
                )
                .security(List.of(new SecurityRequirement().addList("bearerAuth")));
    }
}
