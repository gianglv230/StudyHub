package com.studyhub.studyhub_api.service.enrollment.impl;

import com.studyhub.studyhub_api.dto.response.enrollment.AttendanceEnrollmentResponse;
import com.studyhub.studyhub_api.enums.StatusEnrollment;
import com.studyhub.studyhub_api.mapper.EnrollmentMapper;
import com.studyhub.studyhub_api.model.Enrollment;
import com.studyhub.studyhub_api.repository.EnrollmentRepository;
import com.studyhub.studyhub_api.service.auth.AuthenticationService;
import com.studyhub.studyhub_api.service.enrollment.EnrollmentService;
import com.studyhub.studyhub_api.model.Class;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class EnrollmentServiceImpl implements EnrollmentService {
    EnrollmentRepository enrollmentRepository;
    AuthenticationService authService;
    EnrollmentMapper enrollmentMapper;

    // Get enrollment active of class to make attendance
    @PreAuthorize("hasRole('TEACHER')")
    @Override
    public List<AttendanceEnrollmentResponse> getAttendanceEnrollmentByClassSlug(String classSlug) {
        Class clazz = authService.checkViewClassPermissions(classSlug);
        List<Enrollment> enrollments = enrollmentRepository.findByClassFieldIdAndStatusEqualsIgnoreCaseOrderByStudentLastNameAsc(clazz.getId(), StatusEnrollment.ACTIVE.name());
        return enrollments.stream()
                .map(enrollmentMapper::toAttendanceEnrollmentResponse)
                .toList();
    }
}
