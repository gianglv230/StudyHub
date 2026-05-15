package com.studyhub.studyhub_api.dto.response.attendance;

import java.util.List;

public record StudentAttendanceResponse(
        String studentName,
        String className,
        List<StudentAttendanceRowResponse> attendances
) {
}
