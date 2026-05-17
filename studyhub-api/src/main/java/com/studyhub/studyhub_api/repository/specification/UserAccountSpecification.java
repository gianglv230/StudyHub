package com.studyhub.studyhub_api.repository.specification;

import com.studyhub.studyhub_api.dto.request.user_account.UserAccountFilterRequest;
import com.studyhub.studyhub_api.model.UserAccount;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class UserAccountSpecification {
    public static Specification<UserAccount> filter(
            UserAccountFilterRequest request
    ) {
        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            if (request.id() != null) {
                predicates.add(cb.equal(root.get("id"), request.id()));
            }

            if (request.fullname() != null) {
                predicates.add(cb.like(cb.lower(root.get("fullname")), "%" + request.fullname().trim().toLowerCase() + "%"));
            }

            if (request.username() != null) {
                predicates.add(cb.equal(root.get("username"), request.username().trim()));
            }

            if (request.status() != null) {
                predicates.add(cb.equal(root.get("status"), request.status()));
            }

            if (request.email() != null) {
                predicates.add(cb.equal(root.get("email"), request.email().trim()));
            }

            if (request.phone() != null) {
                predicates.add(cb.equal(root.get("phone"), request.phone().trim()));
            }

            if (request.role() != null) {
                predicates.add(cb.equal(root.get("role"), request.role()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
