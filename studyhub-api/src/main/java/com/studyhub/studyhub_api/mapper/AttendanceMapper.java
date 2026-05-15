package com.studyhub.studyhub_api.mapper;

import com.studyhub.studyhub_api.dto.response.attendance.StudentAttendanceResponse;
import com.studyhub.studyhub_api.dto.response.attendance.StudentAttendanceRowResponse;
import com.studyhub.studyhub_api.model.Attendance;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

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
}
