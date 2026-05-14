package com.studyhub.studyhub_api.repository;

import com.studyhub.studyhub_api.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Integer> {
    Optional<UserAccount> findByUsername(String username);
    List<UserAccount> findByRoleAndStatus(String role, String status);
}
