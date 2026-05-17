package com.studyhub.studyhub_api.repository;

import com.studyhub.studyhub_api.model.Enrollment;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {
    Optional<Enrollment> findByStudentIdAndClassFieldSlugAndStatusEqualsIgnoreCase(Integer studentId, String classFieldSlug, String activeStatus);

    @EntityGraph(attributePaths = {"student"})
    List<Enrollment> findByClassFieldIdAndStatusEqualsIgnoreCaseOrderByStudentLastNameAsc(Integer classId, String activeStatus);

    @Query("""
        SELECT DISTINCT e.classField.id
        FROM Enrollment e
        WHERE e.id IN :enrollmentIds
    """)
    List<Integer> getClassIdsByEnrollmentIds(@Param("enrollmentIds") List<Integer> enrollmentIds);

    @EntityGraph(attributePaths = {"student"})
    List<Enrollment> findAllByIdIn(List<Integer> ids);

    Boolean existsByStudentId(Integer studentId);
    Boolean existsByClassFieldId(Integer classId);
}
