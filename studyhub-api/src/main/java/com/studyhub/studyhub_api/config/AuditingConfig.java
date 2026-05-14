package com.studyhub.studyhub_api.config;

import com.studyhub.studyhub_api.config.security.CustomUserDetails;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

/**
 * AuditingConfig
 *
 * Purpose: Configures Spring Data JPA auditing to automatically capture
 * the current authenticated user ID for audit fields such as `createdBy` and `lastModifiedBy`.
 *
 * Modification:
 */
@Configuration
@EnableJpaAuditing
public class AuditingConfig {
    /**
     * Registers the AuditorAware bean used by Spring Data JPA
     * to retrieve the current authenticated user's ID.
     *
     * @return {AuditorAware<Integer>} - an implementation of AuditorAware<Integer> that fetches user ID from security context
     */
    @Bean
    public AuditorAware<Integer> auditorProvider() {
        return new SpringSecurityAuditAwareImpl();
    }
}

/**
 * SpringSecurityAuditAwareImpl
 *
 * Purpose: Implementation of AuditorAware that retrieves the current user's ID
 * from Spring Security's authentication context for auditing purposes.
 */
class SpringSecurityAuditAwareImpl implements AuditorAware<Integer> {

    /**
     * Retrieves the current auditor's user ID from the security context.
     *
     * @return Optional<Integer> - an Optional containing the user ID if authenticated, otherwise empty
     */
    @Override
    public Optional<Integer> getCurrentAuditor() {
        // Get the current authentication object from the security context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Return empty if there is no authenticated user
        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.empty();
        }

        // Extract principal (user details) from authentication
        Object principal = authentication.getPrincipal();

        // If principal is a CustomUserDetails instance, return the user's ID
        if (principal instanceof CustomUserDetails userDetails) {
            return Optional.ofNullable(userDetails.getId());
//                    .map(Object::toString);
        }
//        else if (principal instanceof String username) {
//            return Optional.of(username);
//        }

        // Otherwise, no valid auditor ID found
        return Optional.empty();
    }
}
