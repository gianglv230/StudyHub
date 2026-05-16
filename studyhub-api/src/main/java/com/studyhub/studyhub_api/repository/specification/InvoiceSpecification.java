package com.studyhub.studyhub_api.repository.specification;

import com.studyhub.studyhub_api.dto.request.invoice.InvoiceFilterRequest;
import com.studyhub.studyhub_api.model.Invoice;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class InvoiceSpecification {

    public static Specification<Invoice> filter(
            InvoiceFilterRequest request
    ) {
        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            if (request.invoiceId() != null) {
                predicates.add(
                        cb.equal(
                                root.get("id"),
                                request.invoiceId()
                        )
                );
            }

            if (request.status() != null) {
                predicates.add(
                        cb.equal(
                                root.get("status"),
                                request.status()
                        )
                );
            }

            if (request.orderCode() != null) {
                predicates.add(
                        cb.equal(
                                root.get("orderCode"),
                                request.orderCode()
                        )
                );
            }

            if (request.studentId() != null) {
                predicates.add(
                        cb.equal(
                                root.get("enrollment").get("student").get("id"),
                                request.studentId()
                        )
                );
            }

            if (request.classId() != null) {
                predicates.add(
                        cb.equal(
                                root.get("enrollment").get("classField").get("id"),
                                request.classId()
                        )
                );
            }

            if (request.dueDate() != null) {
                predicates.add(
                        cb.lessThanOrEqualTo(
                                root.get("dueDate"),
                                request.dueDate()
                        )
                );
            }

            if (request.fromDate() != null) {
                predicates.add(
                        cb.greaterThanOrEqualTo(
                                root.get("createdAt"),
                                request.fromDate()
                        )
                );
            }

            if (request.toDate() != null) {
                predicates.add(
                        cb.lessThanOrEqualTo(
                                root.get("createdAt"),
                                request.toDate()
                        )
                );
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

}
