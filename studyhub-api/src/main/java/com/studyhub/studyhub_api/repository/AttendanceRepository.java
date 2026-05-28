package com.studyhub.studyhub_api.repository;

import com.studyhub.studyhub_api.dto.response.enrollment.CountAttendanceProjection;
import com.studyhub.studyhub_api.dto.response.statistics.AttendanceStatisticsProject;
import com.studyhub.studyhub_api.model.Attendance;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {
    @EntityGraph(attributePaths = {"enrollment", "enrollment.classField"})
    List<Attendance> findByEnrollmentStudentIdAndEnrollmentClassFieldSlug(Integer studentId, String classSlug);

    @Query("""
        SELECT DISTINCT a.sessionDate
        FROM Attendance a
        JOIN a.enrollment e
        WHERE e.classField.id = :classId
        ORDER BY a.sessionDate desc
    """)
    List<LocalDate> getDistinctSessionDateByClassId(@Param("classId") Integer classId);

    @EntityGraph(attributePaths = {"enrollment", "enrollment.student"})
    List<Attendance> findBySessionDateAndEnrollmentClassFieldId(LocalDate sessionDate, Integer id);

    @Query("""
        SELECT a.status AS status, COALESCE(COUNT(1), 0) as numberOfAttendance FROM Attendance a
        WHERE a.sessionDate BETWEEN :fromDate AND :toDate
        AND (a.status = 'PRESENT' OR a.status = 'ABSENT')
        GROUP BY a.status
    """)
    List<AttendanceStatisticsProject> getStatisticsAttendance(LocalDate fromDate, LocalDate toDate);

    @Query("""
        SELECT e.student.id as id, a.status as status, COUNT(1) as quantity
        FROM Attendance a
        JOIN a.enrollment e
        WHERE e.classField.slug = :slug
        GROUP BY id, status
    """)
    List<CountAttendanceProjection> countAttendanceByClassSlug(@Param("slug") String slug);
}
