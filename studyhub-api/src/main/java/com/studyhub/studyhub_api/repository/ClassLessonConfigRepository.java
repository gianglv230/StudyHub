package com.studyhub.studyhub_api.repository;

import com.studyhub.studyhub_api.model.ClassLessonConfig;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClassLessonConfigRepository extends JpaRepository<ClassLessonConfig, Integer> {
    @EntityGraph(attributePaths = {"classLesson"})
    Optional<ClassLessonConfig> findByIdAndClassFieldCreatedBy(Integer clcId, Integer teacherId);

    @Query("""
        SELECT COUNT(1) FROM ClassLessonConfig c
        WHERE c.classLesson.id = :classLessonId
    """)
    Long countClassLessonInClassLessonConfig(@Param("classLessonId") Integer classLessonId);

    @Query("""
        SELECT MAX(clc.orderIndex)
        FROM ClassLessonConfig clc
        JOIN clc.classField c
        WHERE c.id = :classId
    """)
    Long getMaxOrderIndexByClassId(@Param("classId") Integer classId);

    List<ClassLessonConfig> findByClassFieldIdAndClassLessonId(Integer classFieldId, Integer classLessonId);
}
