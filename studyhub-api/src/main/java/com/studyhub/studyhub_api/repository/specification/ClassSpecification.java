package com.studyhub.studyhub_api.repository.specification;

import com.studyhub.studyhub_api.dto.request.classes.ClassFilterRequest;
import com.studyhub.studyhub_api.model.Class;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ClassSpecification {

    public static Specification<Class> filter(
            ClassFilterRequest request
    ) {
        return ((root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (request.subject() != null) {
                predicates.add(cb.equal(root.get("course").get("subject"), request.subject()));
            }

            if (request.targetGrade() != null) {
                predicates.add(cb.equal(root.get("course").get("targetGrade"), request.targetGrade()));
            }

            if (request.categoryName() != null) {
                predicates.add(cb.equal(root.get("course").get("categoryName"), request.categoryName()));
            }

            if (request.status() != null) {
                predicates.add(cb.equal(root.get("status"), request.status()));
            }

            if (request.fromDate() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("startDate"), request.fromDate()));
            }

            if (request.toDate() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("startDate"), request.toDate()));
            }

            if (request.courseName() != null) {
                predicates.add(cb.like(cb.lower(root.get("course").get("courseName")), "%" + request.courseName().trim().toLowerCase() + "%"));
            }

            if(request.teacherId() != null){
                predicates.add(cb.equal(root.get("teacher").get("id"), request.teacherId()));
            }

            if(request.className() != null){
                predicates.add(cb.like(cb.lower(root.get("className")), "%" + request.className().trim().toLowerCase() + "%"));
            }

            if(request.emptyStatus() != null){
                if(request.emptyStatus().equalsIgnoreCase("FULL")){
                    predicates.add(cb.equal(root.get("availableSlots"), 0));
                } else {
                    predicates.add(cb.greaterThan(root.get("availableSlots"), 0));
                }
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        });
    }

}
