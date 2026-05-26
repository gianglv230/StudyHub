package com.studyhub.studyhub_api.service.attendance.impl;

import com.studyhub.studyhub_api.dto.request.attendance.AddAttendanceRequest;
import com.studyhub.studyhub_api.dto.request.attendance.UpdateAttendanceRequest;
import com.studyhub.studyhub_api.dto.response.attendance.AttendanceRowResponse;
import com.studyhub.studyhub_api.dto.response.attendance.SessionDateResponse;
import com.studyhub.studyhub_api.dto.response.attendance.StudentAttendanceResponse;
import com.studyhub.studyhub_api.enums.Role;
import com.studyhub.studyhub_api.exception.AppException;
import com.studyhub.studyhub_api.exception.ErrorCode;
import com.studyhub.studyhub_api.mapper.AttendanceMapper;
import com.studyhub.studyhub_api.model.Attendance;
import com.studyhub.studyhub_api.model.Class;
import com.studyhub.studyhub_api.model.Enrollment;
import com.studyhub.studyhub_api.model.UserAccount;
import com.studyhub.studyhub_api.repository.AttendanceRepository;
import com.studyhub.studyhub_api.repository.EnrollmentRepository;
import com.studyhub.studyhub_api.service.attendance.AttendanceService;
import com.studyhub.studyhub_api.service.auth.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class AttendanceServiceImpl implements AttendanceService {
    AuthenticationService authService;
    AttendanceMapper attendanceMapper;
    AttendanceRepository attendanceRepository;
    EnrollmentRepository enrollmentRepository;
    static final int OVER_TIME = 24;

    @PreAuthorize("hasRole('STUDENT')")
    @Override
    public StudentAttendanceResponse getMyAttendanceByClass(String classSlug) {
        UserAccount account = authService.getUserAccountByJwtToken();
        List<Attendance> attendances = attendanceRepository.findByEnrollmentStudentIdAndEnrollmentClassFieldSlug(account.getId(), classSlug);

//        if (attendances == null || attendances.isEmpty()) {
//            return null;
//        }
//
//        List<StudentAttendanceRowResponse> attendanceRowResponses = attendances.stream()
//                .map(attendanceMapper::toStudentAttendanceRowResponse)
//                .toList();
//
//        return new StudentAttendanceResponse(account.getFullname(), className, attendanceRowResponses);

        String className = attendances.getFirst().getEnrollment().getClassField().getClassName();
        return attendanceMapper.toStudentAttendanceResponse(attendances, account.getFullname(), className);
    }

    // Get list session date by classSlug
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @Override
    public SessionDateResponse getDistinctSessionDateByClassSlug(String classSlug) {
        Class clazz = authService.checkViewClassPermissions(classSlug);
        List<LocalDate> sessionDates = attendanceRepository.getDistinctSessionDateByClassId(clazz.getId());
        return attendanceMapper.toSessionDateResponse(clazz.getClassName(), clazz.getTeacher().getFullname(), sessionDates);
    }

    // Wrapper for attendance rows by sessionDate and class
    private List<AttendanceRowResponse> getAttendanceRow(LocalDate sessionDate, Class clazz) {
        List<Attendance> attendances = attendanceRepository.findBySessionDateAndEnrollmentClassFieldId(sessionDate, clazz.getId());
        return attendances.stream()
                .map(attendanceMapper::toAttendanceRowResponse)
                .toList();
    }

    // Get list attendance rows by session date adn classSlug
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @Override
    public List<AttendanceRowResponse> getAttendanceRowBySessionDateAndClassSlug(LocalDate sessionDate, String classSlug) {
        try {
            Class clazz = authService.checkViewClassPermissions(classSlug);
            return getAttendanceRow(sessionDate, clazz);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }

    @PreAuthorize("hasRole('TEACHER')")
    @Override
    public List<AttendanceRowResponse> addAttendance(String classSlug, List<AddAttendanceRequest> addAttendanceRequest) {
        Class clazz = authService.checkViewClassPermissions(classSlug);
        List<Integer> enrollmentIds = addAttendanceRequest.stream()
                .map(AddAttendanceRequest::enrollmentId)
                .distinct().toList();

        authService.checkAttendanceManagementPermissions(clazz, enrollmentIds);

        // Fetch full enrollment objects to avoid null fields in response due to Hibernate cache
        List<Enrollment> enrollments = enrollmentRepository.findAllByIdIn(enrollmentIds);
        Map<Integer, Enrollment> enrollmentMap = enrollments.stream()
                .collect(Collectors.toMap(Enrollment::getId, e -> e));

        List<Attendance> attendances = new ArrayList<>();
        LocalDate now = LocalDate.now();

        addAttendanceRequest.forEach(
                attendance -> {
                    Enrollment enrollment = enrollmentMap.get(attendance.enrollmentId());
                    if (enrollment != null) {
                        attendances.add(Attendance.builder()
                                .enrollment(enrollment)
                                .sessionDate(now)
                                .status(attendance.status())
                                .note(attendance.note())
                                .build());
                    }
                }
        );

        attendanceRepository.saveAll(attendances);

        return getAttendanceRow(now, clazz);
    }

    // Check teacher is created person and overtime
    private void checkUpdateAttendanceTeacherPermission(List<Attendance> attendances) {
        UserAccount account = authService.getUserAccountByJwtToken();
        if (account.getRole().equalsIgnoreCase(Role.TEACHER.name())) {
            List<Integer> createdIds = attendances.stream()
                    .map(Attendance::getCreatedBy)
                    .distinct().toList();

            List<Instant> createdAts = attendances.stream()
                    .map(Attendance::getCreatedAt)
                    .distinct().toList();

            Instant now = Instant.now();

            createdIds.forEach(
                    createdId -> {
                        if (!Objects.equals(account.getId(), createdId)) {
                            throw new AppException(ErrorCode.UNAUTHENTICATED);
                        }
                    }
            );

            boolean overtime = createdAts.stream()
                    .anyMatch(createdAt ->
                            Duration.between(createdAt, now).toHours() > OVER_TIME
                    );

            if (overtime) {
                throw new AppException(ErrorCode.OVER_TIME_UPDATE_ATTENDANCE);
            }

        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    // Update attendances
    @Override
    public List<AttendanceRowResponse> updateAttendances(String classSlug, List<UpdateAttendanceRequest> updateAttendances) {
        Class clazz = authService.checkViewClassPermissions(classSlug);
        List<Integer> ids = updateAttendances.stream()
                .map(UpdateAttendanceRequest::id).distinct().toList();
        List<Attendance> attendances = attendanceRepository.findAllById(ids);

        // Check teacher is created person and overtime
        checkUpdateAttendanceTeacherPermission(attendances);

        // Update attendances
        Map<Integer, UpdateAttendanceRequest> requestMap = updateAttendances.stream()
                .collect(Collectors.toMap(
                        UpdateAttendanceRequest::id,
                        Function.identity()
                ));

        for (Attendance attendance : attendances) {
            UpdateAttendanceRequest request = requestMap.get(attendance.getId());
            attendanceMapper.updateAttendance(request, attendance);
        }

        attendanceRepository.saveAll(attendances);

        return getAttendanceRow(attendances.getFirst().getSessionDate(), clazz);
    }


}
