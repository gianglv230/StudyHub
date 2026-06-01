package com.studyhub.studyhub_api.repository;

import com.studyhub.studyhub_api.dto.response.course.CourseLiteProjection;
import com.studyhub.studyhub_api.model.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer>, JpaSpecificationExecutor<Course> {
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
            LEFT JOIN resource 
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
            FROM course LEFT JOIN `resource` ON course.thumbnail = `resource`.resource_id
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

    @Query("""
                SELECT DISTINCT c.subject FROM Course c
                WHERE c.status = "ACTIVE"
            """)
    List<String> getDistinctSubject();

    @Query("""
                SELECT DISTINCT c.categoryName FROM Course c
                WHERE c.status = "ACTIVE"
            """)
    List<String> getDistinctCategoryName();

    @Query("""
                SELECT DISTINCT c.targetGrade FROM Course c
                WHERE c.status = "ACTIVE"
            """)
    List<String> getDistinctTargetGrade();

    @Query("""
                SELECT c FROM Course c
                WHERE (:subject IS NULL OR c.subject = :subject)
                AND (:targetGrade IS NULL OR c.targetGrade = :targetGrade)
                AND (:categoryName IS NULL OR c.categoryName = :categoryName)
                AND c.status = "ACTIVE"
            """)
    Page<Course> filterCourses(
            @Param("subject") String subject,
            @Param("targetGrade") String targetGrade,
            @Param("categoryName") String categoryName,
            Pageable pageable
    );

    @EntityGraph(attributePaths = {"videoDemo", "lessons"})
    @Query("""
        SELECT c FROM Course c
        LEFT JOIN c.videoDemo videoDemo
        LEFT JOIN c.lessons lessons
        WHERE c.status = 'ACTIVE'
        AND c.slug = :slug
    """)
    Optional<Course> getCourseDetailBySlug(@Param("slug") String slug);

    @Query("""
        SELECT COUNT(1) FROM Course c
        WHERE c.status = 'ACTIVE'
    """)
    Long countActiveCourses();

    @EntityGraph(attributePaths = {"thumbnail"})
    Page<Course> findAll(Specification<Course> specification, Pageable pageable);

    @EntityGraph(attributePaths = {"thumbnail", "videoDemo", "lessons"})
    Optional<Course> findBySlug(String slug);

    @EntityGraph(attributePaths = {"thumbnail", "videoDemo", "lessons"})
    Optional<Course> findById(Integer id);

    Boolean existsBySlug(String slug);
}
