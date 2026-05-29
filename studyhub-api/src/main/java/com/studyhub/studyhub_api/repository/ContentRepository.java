//package com.studyhub.studyhub_api.repository;
//
//import com.studyhub.studyhub_api.dto.response.classes.ContentCountProjection;
//import com.studyhub.studyhub_api.model.Content;
//import org.springframework.data.jpa.repository.EntityGraph;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//public interface ContentRepository extends JpaRepository<Content, Integer> {
//    @Query("""
//                SELECT c.classLessonId as classLessonId, COUNT(1) as numberOfContent
//                FROM Content c
//                WHERE c.classLessonId IN :ids
//                GROUP BY classLessonId
//            """)
//    List<ContentCountProjection> countByClassLessonId(@Param("ids") List<Integer> ids);
//
////    @EntityGraph(attributePaths = {"videoContent", "materials", "materials.resource"})
////    Content findById(int id);
//}
