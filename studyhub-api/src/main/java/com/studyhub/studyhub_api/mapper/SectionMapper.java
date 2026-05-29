package com.studyhub.studyhub_api.mapper;

import com.studyhub.studyhub_api.dto.request.class_lesson.SectionTeacherRequest;
import com.studyhub.studyhub_api.dto.response.class_lesson.SectionTeacherResponse;
import com.studyhub.studyhub_api.dto.response.content.ResourceResponse;
import com.studyhub.studyhub_api.dto.response.resource.ChildrenResourceResponse;
import com.studyhub.studyhub_api.dto.response.section.SectionResponse;
import com.studyhub.studyhub_api.model.Resource;
import com.studyhub.studyhub_api.model.Section;
import org.mapstruct.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Mapper(componentModel = "spring", uses = {ResourceMapper.class})
public interface SectionMapper {
    SectionResponse toSectionResponse(Section section);

    // 2. Method con: Định nghĩa cách map từ List<Integer> sang List<ChildrenResourceResponse> bằng Map context
    @Mapping(target = "materials", source = "materials", qualifiedByName = "mapIdsToResponses")
    SectionTeacherResponse toSectionTeacherResponse(
            Section section,
            @Context Map<Integer, ChildrenResourceResponse> resourceMap
    );

    // 3. Custom logic sử dụng Context để tra cứu dữ liệu
    @Named("mapIdsToResponses")
    default List<ChildrenResourceResponse> mapIdsToResponses(
            List<Integer> materialIds,
            @Context Map<Integer, ChildrenResourceResponse> resourceMap
    ) {
        if (materialIds == null || resourceMap == null) {
            return Collections.emptyList();
        }
        return materialIds.stream()
                .map(resourceMap::get)       // Tìm ResourceResponse tương ứng với ID trong Map
                .filter(Objects::nonNull)     // Loại bỏ trường hợp id không tồn tại trong map
                .toList();
    }

    // DEPRECATED
//    @Mappings({
//            @Mapping(target = "id", source = "id"),
//            @Mapping(target = "sectionName", source = "description")
//    })
//    SectionTeacherResponse toSectionTeacherResponse(Section section);

    @Mappings({@Mapping(target = "videoContent", source = "videoContentId"),})
    Section toSection(SectionTeacherRequest sectionTeacherRequest);

    default Resource map(Integer id) {
        if (id == null) {
            return null;
        }

        Resource resource = new Resource();
        resource.setId(id);

        return resource;
    }
}
