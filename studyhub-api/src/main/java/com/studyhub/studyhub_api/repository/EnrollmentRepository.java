package com.studyhub.studyhub_api.repository;

import com.studyhub.studyhub_api.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {
    Optional<Enrollment> findByStudentIdAndClassFieldSlugAndStatusEqualsIgnoreCase(Integer studentId, String classFieldSlug, String activeStatus);
}
