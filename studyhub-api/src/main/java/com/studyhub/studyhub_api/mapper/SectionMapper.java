package com.studyhub.studyhub_api.mapper;

import com.studyhub.studyhub_api.dto.response.section.SectionResponse;
import com.studyhub.studyhub_api.model.Section;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = ContentMapper.class)
public interface SectionMapper {
    SectionResponse toSectionResponse(Section section);
}
