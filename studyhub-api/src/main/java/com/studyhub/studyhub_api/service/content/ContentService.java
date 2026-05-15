package com.studyhub.studyhub_api.service.content;

import com.studyhub.studyhub_api.dto.response.content.ContentResponse;

public interface ContentService {
    ContentResponse getContent(String classSlug, String classLessonSlug, Integer contentId);
}
