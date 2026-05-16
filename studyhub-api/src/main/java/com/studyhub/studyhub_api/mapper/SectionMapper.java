package com.studyhub.studyhub_api.mapper;

import com.studyhub.studyhub_api.dto.request.class_lesson.SectionTeacherRequest;
import com.studyhub.studyhub_api.dto.response.class_lesson.SectionTeacherResponse;
import com.studyhub.studyhub_api.dto.response.section.SectionResponse;
import com.studyhub.studyhub_api.model.Section;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = ContentMapper.class)
public interface SectionMapper {
    SectionResponse toSectionResponse(Section section);

    SectionTeacherResponse toSectionTeacherResponse(Section section);

    Section toSection(SectionTeacherRequest sectionTeacherRequest);
}
