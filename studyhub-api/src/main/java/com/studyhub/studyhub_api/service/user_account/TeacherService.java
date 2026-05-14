package com.studyhub.studyhub_api.service.user_account;

import com.studyhub.studyhub_api.dto.response.teacher.TeacherLiteResponse;

import java.util.List;

public interface TeacherService {
    List<TeacherLiteResponse> getTeacherList();
}
