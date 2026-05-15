package com.studyhub.studyhub_api.repository;

import com.studyhub.studyhub_api.model.Attendance;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {
    @EntityGraph(attributePaths = {"enrollment", "enrollment.classField"})
    List<Attendance> findByEnrollmentStudentIdAndEnrollmentClassFieldSlug(Integer studentId, String classSlug);
}
