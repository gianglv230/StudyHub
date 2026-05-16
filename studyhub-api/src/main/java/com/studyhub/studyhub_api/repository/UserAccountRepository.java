package com.studyhub.studyhub_api.repository;

import com.studyhub.studyhub_api.dto.response.user_account.UserSimpleProjection;
import com.studyhub.studyhub_api.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Integer> {
    Optional<UserAccount> findByUsername(String username);
    List<UserAccount> findByRoleAndStatus(String role, String status);

    @Query("""
                SELECT u.id as id, u.fullname as fullname
                FROM UserAccount u
                WHERE u.id in :ids
            """)
    List<UserSimpleProjection> findAllSimpleProjectionsByIds(@Param("ids") List<Integer> ids);

    @Query("""
        SELECT COUNT(1) FROM UserAccount u
        WHERE u.role = :role
        AND u.status = 'ACTIVE'
    """)
    Long countByRole(@Param("role") String role);
}
