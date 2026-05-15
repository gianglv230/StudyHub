package com.studyhub.studyhub_api.dto.response.attendance;

public record StudentAttendanceRowResponse(
        String sessionDate,
        String status,
        String note
) {
}
