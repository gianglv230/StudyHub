package com.studyhub.studyhub_api.repository;

import com.studyhub.studyhub_api.dto.response.course.CourseLiteProjection;
import com.studyhub.studyhub_api.model.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
    @Query(value = """
            SELECT 
                course.course_id AS courseId,
                course.slug AS slug,
                course.title AS title,
                course.number_of_lessons AS numberOfLessons,
                course.subject AS subject,
                course.target_grade AS targetGrade,
                course.category_name AS categoryName,
                resource.url AS thumbnail
            FROM course 
            JOIN resource 
                ON course.thumbnail = resource.resource_id
            WHERE course.course_id IN (
                SELECT class.course_id 
                FROM class
                WHERE (
                    class.status = 'UPCOMING'
                    OR class.status = 'ONGOING'
                )
                ORDER BY 
                    (class.available_slots / class.max_students) ASC,
                    class.opening_date DESC
            )
            LIMIT 9
            """, nativeQuery = true)
    List<CourseLiteProjection> findHotCourses();

    @Query(value = """
            SELECT 
                course.course_id AS courseId,
                course.slug AS slug,
                course.title AS title,
                course.number_of_lessons AS numberOfLessons,
                course.subject AS subject,
                course.target_grade AS targetGrade,
                course.category_name AS categoryName,
                resource.url AS thumbnail
            FROM course JOIN `resource` ON course.thumbnail = `resource`.resource_id
            WHERE course.course_id IN (
            	SELECT course_id
            	FROM class
            	WHERE ((class.`status` = 'UPCOMING') OR (class.`status` = 'ONGOING'))
            	AND class.available_slots > 0
            	ORDER BY class.created_at DESC
            )
            LIMIT 9;
            """, nativeQuery = true)
    List<CourseLiteProjection> findNewCourses();

    @Query("""
                SELECT course FROM Course course
                WHERE LOWER(course.title) LIKE LOWER(CONCAT('%', :title, '%'))
                AND course.status = "ACTIVE"
            """)
    Page<Course> findCoursesByTitleLike(@Param("title") String title, Pageable pageable);
}
