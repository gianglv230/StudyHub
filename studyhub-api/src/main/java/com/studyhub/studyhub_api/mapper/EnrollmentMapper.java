package com.studyhub.studyhub_api.mapper;

import com.studyhub.studyhub_api.dto.response.enrollment.AttendanceEnrollmentResponse;
import com.studyhub.studyhub_api.model.Enrollment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface EnrollmentMapper {
    @Mappings({
            @Mapping(target = "enrollmentId", source = "id"),
            @Mapping(target = "studentName", source = "student.fullname"),
            @Mapping(target = "dateOfBirth", source = "student.dateOfBirth")
    })
    AttendanceEnrollmentResponse toAttendanceEnrollmentResponse(Enrollment enrollment);
}
