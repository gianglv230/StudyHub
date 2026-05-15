package com.studyhub.studyhub_api.repository;

import com.studyhub.studyhub_api.model.ClassLesson;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassLessonRepository extends JpaRepository<ClassLesson, Integer> {
//    @EntityGraph(attributePaths = {"classLessonConfigs"})
//    List<ClassLesson> findByClassLessonConfigsClassFieldId(Integer classId);
}
