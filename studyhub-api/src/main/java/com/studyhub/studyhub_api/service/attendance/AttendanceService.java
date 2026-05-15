package com.studyhub.studyhub_api.service.attendance;

import com.studyhub.studyhub_api.dto.response.attendance.StudentAttendanceResponse;

public interface AttendanceService {
    StudentAttendanceResponse getMyAttendanceByClass(String classSlug);
}
