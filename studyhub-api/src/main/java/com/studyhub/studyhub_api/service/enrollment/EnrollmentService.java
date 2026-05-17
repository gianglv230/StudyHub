package com.studyhub.studyhub_api.service.enrollment;

import com.studyhub.studyhub_api.dto.response.enrollment.AttendanceEnrollmentResponse;
import com.studyhub.studyhub_api.dto.response.enrollment.StudentInClassResponse;

import java.util.List;

public interface EnrollmentService {
    List<AttendanceEnrollmentResponse> getAttendanceEnrollmentByClassSlug(String classSlug);

    List<StudentInClassResponse> getStudentsInClass(String classSlug);
}
