package com.studyhub.studyhub_api.dto.response.enrollment;

import java.time.LocalDate;

public record StudentInClassResponse(
        Integer id,
        Integer enrollmentId,
        String firstName,
        String lastName,
        Boolean gender,
        LocalDate dateOfBirth,
        String status,
        Integer numberOfPresents,
        Integer numberOfAbsents
) {
}
