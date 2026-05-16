package com.studyhub.studyhub_api.dto.request.attendance;

public record UpdateAttendanceRequest(
        Integer id,
        String status,
        String note
) {
}
