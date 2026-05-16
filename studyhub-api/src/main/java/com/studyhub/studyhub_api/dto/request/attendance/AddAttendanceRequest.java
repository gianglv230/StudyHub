package com.studyhub.studyhub_api.dto.request.attendance;

public record AddAttendanceRequest(
        Integer enrollmentId,
        String status,
        String note
) {
}
