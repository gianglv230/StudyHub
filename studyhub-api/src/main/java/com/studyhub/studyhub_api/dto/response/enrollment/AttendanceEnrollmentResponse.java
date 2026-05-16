package com.studyhub.studyhub_api.dto.response.enrollment;

import java.time.LocalDate;

public record AttendanceEnrollmentResponse(
    Integer enrollmentId,
    String studentName,
    LocalDate dateOfBirth
){}
