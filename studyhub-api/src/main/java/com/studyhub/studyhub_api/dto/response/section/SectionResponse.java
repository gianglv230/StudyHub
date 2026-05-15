package com.studyhub.studyhub_api.dto.response.section;

import java.util.List;

public record SectionResponse(
        String sectionName,
        Integer orderIndex,
        List<ContentLiteResponse> contents
) {
}
