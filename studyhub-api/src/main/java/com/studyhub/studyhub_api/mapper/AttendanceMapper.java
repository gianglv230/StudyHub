package com.studyhub.studyhub_api.mapper;

import com.studyhub.studyhub_api.dto.request.attendance.UpdateAttendanceRequest;
import com.studyhub.studyhub_api.dto.response.attendance.AttendanceRowResponse;
import com.studyhub.studyhub_api.dto.response.attendance.SessionDateResponse;
import com.studyhub.studyhub_api.dto.response.attendance.StudentAttendanceResponse;
import com.studyhub.studyhub_api.dto.response.attendance.StudentAttendanceRowResponse;
import com.studyhub.studyhub_api.model.Attendance;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;

import java.time.LocalDate;
import java.util.List;

@Mapper(componentModel = "spring")
public interface AttendanceMapper {
    @Mappings({
        @Mapping(target = "studentName", source = "studentName"),
        @Mapping(target = "className", source = "className"),
        @Mapping(target = "attendances", source = "attendances"),
    })
    StudentAttendanceResponse toStudentAttendanceResponse(List<Attendance> attendances, String studentName, String className);

    StudentAttendanceRowResponse toStudentAttendanceRowResponse(Attendance attendance);

    SessionDateResponse toSessionDateResponse(String className, String teacherName, List<LocalDate> sessionDates);

    @Mappings({
            @Mapping(target = "studentId", source = "enrollment.student.id"),
            @Mapping(target = "studentName", source = "enrollment.student.fullname"),
            @Mapping(target = "dateOfBirth", source = "enrollment.student.dateOfBirth"),
    })
    AttendanceRowResponse toAttendanceRowResponse(Attendance attendance);

    void updateAttendance(
            UpdateAttendanceRequest request,
            @MappingTarget Attendance attendance
    );
}
