package com.studyhub.studyhub_api.dto.response.attendance;

import java.time.LocalDate;

public record AttendanceRowResponse(
        Integer id,
        Integer studentId,
        String studentName,
        LocalDate dateOfBirth,

        String status,
        String note
) {
}
