package com.studyhub.studyhub_api.repository;

import com.studyhub.studyhub_api.model.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.studyhub.studyhub_api.model.Class;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClassRepository extends JpaRepository<Class, Integer> {

    @EntityGraph(attributePaths = {"teacher", "course"})
    @Query("""
                SELECT class FROM Class class
                JOIN class.course course
                WHERE (:subject IS NULL OR course.subject = :subject)
                AND (:targetGrade IS NULL OR course.targetGrade = :targetGrade)
                AND (:categoryName IS NULL OR course.categoryName = :categoryName)
                AND course.status = "ACTIVE"
                AND (class.status = "UPCOMING" OR class.status = "ONGOING")
                AND class.availableSlots > 0
            """)
    Page<Class> filterClasses(
            @Param("subject") String subject,
            @Param("targetGrade") String targetGrade,
            @Param("categoryName") String categoryName,
            Pageable pageable
    );

    @EntityGraph(attributePaths = {"teacher", "course"})
    @Query("""
                SELECT class FROM Class class
                JOIN class.course course
                WHERE course.slug = :courseSlug
                AND course.status = "ACTIVE"
                AND (class.status = "UPCOMING" OR class.status = "ONGOING")
                AND class.availableSlots > 0
            """)
    List<Class> getAllClassesOfCourse(@Param("courseSlug") String courseSlug);

    @EntityGraph(attributePaths = {"teacher", "course"})
    @Query("""
                SELECT class FROM Class class
                JOIN class.course course
                JOIN class.teacher teacher
                WHERE teacher.id = :teacherId
                AND course.status = "ACTIVE"
                AND (class.status = "UPCOMING" OR class.status = "ONGOING")
                AND class.availableSlots > 0
            """)
    Page<Class> getAllClassesOfTeacher(@Param("teacherId") int teacherId, Pageable pageable);

    @EntityGraph(attributePaths = {"course.videoDemo"})
    @Query("""
        SELECT class FROM Class class
        JOIN class.course c
        JOIN class.teacher teacher
        LEFT JOIN c.videoDemo videoDemo
        WHERE c.status = 'ACTIVE'
        AND class.slug = :slug
    """)
    Optional<Class> getClassDetailBySlug(@Param("slug") String slug);
}
