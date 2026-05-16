package com.studyhub.studyhub_api.service.attendance.impl;

import com.studyhub.studyhub_api.dto.response.attendance.AttendanceRowResponse;
import com.studyhub.studyhub_api.dto.response.attendance.SessionDateResponse;
import com.studyhub.studyhub_api.dto.response.attendance.StudentAttendanceResponse;
import com.studyhub.studyhub_api.dto.response.attendance.StudentAttendanceRowResponse;
import com.studyhub.studyhub_api.mapper.AttendanceMapper;
import com.studyhub.studyhub_api.model.Attendance;
import com.studyhub.studyhub_api.model.Class;
import com.studyhub.studyhub_api.model.UserAccount;
import com.studyhub.studyhub_api.repository.AttendanceRepository;
import com.studyhub.studyhub_api.service.attendance.AttendanceService;
import com.studyhub.studyhub_api.service.auth.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class AttendanceServiceImpl implements AttendanceService {
    AuthenticationService authService;
    AttendanceMapper attendanceMapper;
    AttendanceRepository attendanceRepository;

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

    // Get list attendance rows by session date adn classSlug
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @Override
    public List<AttendanceRowResponse> getAttendanceRowBySessionDateAndClassSlug(LocalDate sessionDate, String classSlug) {
        Class clazz = authService.checkViewClassPermissions(classSlug);
        List<Attendance> attendances = attendanceRepository.findBySessionDateAndEnrollmentClassFieldId(sessionDate, clazz.getId());
        return attendances.stream()
                .map(attendanceMapper::toAttendanceRowResponse)
                .toList();
    }


}
