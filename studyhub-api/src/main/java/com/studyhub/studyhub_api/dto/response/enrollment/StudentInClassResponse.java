package com.studyhub.studyhub_api.dto.response.enrollment;

import java.time.LocalDate;

public record StudentInClassResponse(
        Integer id,
        Integer enrollmentId,
        String firstname,
        String lastname,
        Boolean gender,
        LocalDate dateOfBirth,
        String status,
        Integer numberOfPresents,
        Integer numberOfAbsents
) {
}
