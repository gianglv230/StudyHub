package com.studyhub.studyhub_api.repository;

import com.studyhub.studyhub_api.dto.response.classes.SectionCountProjection;
import com.studyhub.studyhub_api.model.Section;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SectionRepository extends JpaRepository<Section, Integer> {

    @Query("""
        SELECT s.classLesson.id as classLessonId, COUNT(1) as numberOfSection 
        FROM Section s
        WHERE s.classLesson.id IN :ids
        GROUP BY classLessonId
    """)
    List<SectionCountProjection> countsByClassLessonId(@Param("ids") List<Integer> ids);

    @EntityGraph(attributePaths = {"contents"})
    List<Section> findByClassLessonSlugOrderByOrderIndexAsc(String classLessonSlug);
}
