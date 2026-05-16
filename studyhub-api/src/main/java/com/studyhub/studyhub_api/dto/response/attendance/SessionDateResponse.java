package com.studyhub.studyhub_api.dto.response.attendance;

import java.time.LocalDate;
import java.util.List;

public record SessionDateResponse(
        String className,
        String teacherName,
        List<LocalDate> sessionDates
) {
}
