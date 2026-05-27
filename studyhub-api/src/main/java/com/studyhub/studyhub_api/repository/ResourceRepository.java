package com.studyhub.studyhub_api.repository;

import com.studyhub.studyhub_api.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Integer> {
    Optional<Resource> findByIdAndCreatedByAndResourceTypeEqualsIgnoreCase(int id, int createdBy, String type);
    Optional<Resource> findByIdAndCreatedBy(int id, int createdBy);
    Boolean existsByResourceParentId(int resourceParentId);

    List<Resource> findByResourceParentIsNullAndCreatedByAndResourceTypeEqualsIgnoreCase(int ownerId, String type);
}
