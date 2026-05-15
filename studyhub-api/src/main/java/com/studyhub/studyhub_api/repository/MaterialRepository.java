package com.studyhub.studyhub_api.repository;

import com.studyhub.studyhub_api.model.Material;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Integer> {
    @EntityGraph(attributePaths = {"content", "resource"})
    @Query("""
        SELECT m FROM Content c
        LEFT JOIN c.materials m
        WHERE c.id = :contentId
    """)
    List<Material> findByContentId(@Param("contentId") int contentId);
}
