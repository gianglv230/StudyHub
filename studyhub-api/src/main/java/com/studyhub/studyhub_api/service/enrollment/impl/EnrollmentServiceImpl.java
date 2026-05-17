package com.studyhub.studyhub_api.service.enrollment.impl;

import com.studyhub.studyhub_api.dto.response.enrollment.AttendanceEnrollmentResponse;
import com.studyhub.studyhub_api.dto.response.enrollment.CountAttendanceProjection;
import com.studyhub.studyhub_api.dto.response.enrollment.StudentInClassResponse;
import com.studyhub.studyhub_api.enums.StatusAttendance;
import com.studyhub.studyhub_api.enums.StatusEnrollment;
import com.studyhub.studyhub_api.mapper.EnrollmentMapper;
import com.studyhub.studyhub_api.mapper.UserAccountMapper;
import com.studyhub.studyhub_api.model.Enrollment;
import com.studyhub.studyhub_api.model.UserAccount;
import com.studyhub.studyhub_api.repository.AttendanceRepository;
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
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class EnrollmentServiceImpl implements EnrollmentService {
    EnrollmentRepository enrollmentRepository;
    AttendanceRepository attendanceRepository;
    AuthenticationService authService;
    EnrollmentMapper enrollmentMapper;
    UserAccountMapper userAccountMapper;

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

    private Map<Integer, Integer> toAttendanceMap(
            List<CountAttendanceProjection> projections,
            StatusAttendance status
    ) {
        return projections.stream()
                .filter(attendance ->
                        attendance.getStatus().equalsIgnoreCase(status.name()))
                .collect(Collectors.toMap(
                        CountAttendanceProjection::getId,
                        p -> p.getQuantity().intValue()
                ));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public List<StudentInClassResponse> getStudentsInClass(String classSlug) {
        List<UserAccount> students = enrollmentRepository.findAllStudentByClassSlug(classSlug);
        List<CountAttendanceProjection> attendanceProjections = attendanceRepository.countAttendanceByClassSlug(classSlug);

        Map<Integer, Integer> presentMap = toAttendanceMap(attendanceProjections, StatusAttendance.PRESENT);
        Map<Integer, Integer> absentMap = toAttendanceMap(attendanceProjections, StatusAttendance.ABSENT);

        return students.stream()
                .map(student -> userAccountMapper.toStudentInClassResponse(student, presentMap.getOrDefault(student.getId(), 0), absentMap.getOrDefault(student.getId(), 0)))
                .toList();
    }
}
