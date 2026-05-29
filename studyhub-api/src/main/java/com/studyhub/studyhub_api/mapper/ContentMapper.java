//package com.studyhub.studyhub_api.mapper;
//
//import com.studyhub.studyhub_api.dto.request.class_lesson.ContentTeacherRequest;
//import com.studyhub.studyhub_api.dto.response.class_lesson.ContentTeacherResponse;
//import com.studyhub.studyhub_api.dto.response.content.ContentResponse;
//import com.studyhub.studyhub_api.dto.response.section.ContentLiteResponse;
//import com.studyhub.studyhub_api.model.Content;
//import com.studyhub.studyhub_api.model.Material;
//import com.studyhub.studyhub_api.model.Resource;
//import org.mapstruct.Mapper;
//import org.mapstruct.Mapping;
//import org.mapstruct.Mappings;
//
//import java.util.List;
//import java.util.Set;
//import java.util.stream.Collectors;
//
//@Mapper(componentModel = "spring", uses = {ResourceMapper.class, MaterialMapper.class})
//public interface ContentMapper {
//    @Mapping(target = "contentId", source = "id")
//    ContentLiteResponse toContentLiteResponse(Content content);
//
//    @Mappings({
//            @Mapping(target = "contentName", source = "content.contentName"),
//            @Mapping(target = "description", source = "content.description"),
//            @Mapping(target = "video", source = "content.videoContent.url"),
//            @Mapping(target = "textContent", source = "content.textContent"),
//            @Mapping(target = "type", source = "content.type"),
//            @Mapping(target = "resources", source = "materials", qualifiedByName = "mapMaterialToResource")
//    })
//    ContentResponse toContentResponse(Content content, List<Material> materials);
//
//    ContentTeacherResponse toContentTeacherResponse(Content content);
//
//
//    @Mappings({
//            @Mapping(target = "videoContent",
//                    source = "videoContentId"),
//
//            @Mapping(target = "materials",
//                    source = "materials")
//    })
//    Content toContent(ContentTeacherRequest request);
//
//    default Resource map(Integer id) {
//        if (id == null) {
//            return null;
//        }
//
//        Resource resource = new Resource();
//        resource.setId(id);
//
//        return resource;
//    }
//
////    default Set<Material> map(List<Integer> ids) {
////        if (ids == null) {
////            return Set.of();
////        }
////
////        return ids.stream()
////                .map(id -> {
////                    Material material = new Material();
////                    material.setResource(Resource.builder()
////                                    .id(id)
////                            .build());
////                    return material;
////                })
////                .collect(Collectors.toSet());
////    }
//}
