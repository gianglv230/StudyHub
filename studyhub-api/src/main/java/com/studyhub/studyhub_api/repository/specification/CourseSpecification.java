package com.studyhub.studyhub_api.repository.specification;

import com.studyhub.studyhub_api.dto.request.course.CourseFilterRequest;
import com.studyhub.studyhub_api.model.Course;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class CourseSpecification {

    public static Specification<Course> filter(
            CourseFilterRequest request
    ) {
        return ((root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (request.subject() != null) {
                predicates.add(cb.equal(root.get("subject"), request.subject()));
            }

            if (request.targetGrade() != null) {
                predicates.add(cb.equal(root.get("targetGrade"), request.targetGrade()));
            }

            if (request.categoryName() != null) {
                predicates.add(cb.equal(cb.lower(root.get("categoryName")), request.categoryName()));
            }

            if (request.status() != null) {
                predicates.add(cb.equal(root.get("status"), request.status()));
            }

            if (request.fromDate() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("createdAt"), request.fromDate()));
            }

            if (request.toDate() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("createdAt"), request.toDate()));
            }

            if (request.courseName() != null) {
                predicates.add(cb.like(cb.lower(root.get("title")), "%" + request.courseName().trim().toLowerCase() + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        });
    }

}
