package com.studyhub.studyhub_api.service.attendance;

import com.studyhub.studyhub_api.dto.request.attendance.AddAttendanceRequest;
import com.studyhub.studyhub_api.dto.request.attendance.UpdateAttendanceRequest;
import com.studyhub.studyhub_api.dto.response.attendance.AttendanceRowResponse;
import com.studyhub.studyhub_api.dto.response.attendance.SessionDateResponse;
import com.studyhub.studyhub_api.dto.response.attendance.StudentAttendanceResponse;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceService {
    StudentAttendanceResponse getMyAttendanceByClass(String classSlug);
    SessionDateResponse getDistinctSessionDateByClassSlug(String classSlug);
    List<AttendanceRowResponse> getAttendanceRowBySessionDateAndClassSlug(LocalDate sessionDate, String classSlug);
    List<AttendanceRowResponse> addAttendance(String classSlug, List<AddAttendanceRequest> addAttendanceRequest);
    List<AttendanceRowResponse> updateAttendances(String classSlug, List<UpdateAttendanceRequest> updateAttendanceRequest);
}
