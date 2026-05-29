package com.studyhub.studyhub_api.dto.response.class_lesson;

import com.studyhub.studyhub_api.dto.response.content.ResourceResponse;
import com.studyhub.studyhub_api.dto.response.resource.ChildrenResourceResponse;

import java.util.List;

public record SectionTeacherResponse(
        Integer id,
        String sectionName,
        String description,
        ChildrenResourceResponse videoContent,
        String textContent,
        Integer orderIndex,
        String type,
        List<ChildrenResourceResponse> materials
) {
}
