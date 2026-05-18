package com.studyhub.studyhub_api.service.enrollment;

import com.studyhub.studyhub_api.dto.request.enrollment.AddStudentRequest;
import com.studyhub.studyhub_api.dto.request.enrollment.MergeClassRequest;
import com.studyhub.studyhub_api.dto.request.enrollment.SuspendStudentRequest;
import com.studyhub.studyhub_api.dto.request.enrollment.TransferStudentRequest;
import com.studyhub.studyhub_api.dto.response.enrollment.AttendanceEnrollmentResponse;
import com.studyhub.studyhub_api.dto.response.enrollment.StudentInClassResponse;

import java.util.List;

public interface EnrollmentService {
    List<AttendanceEnrollmentResponse> getAttendanceEnrollmentByClassSlug(String classSlug);

    List<StudentInClassResponse> getStudentsInClass(String classSlug);

    Boolean addStudent(AddStudentRequest request);
    Boolean suspendStudent(SuspendStudentRequest request);
    Boolean transferStudent(TransferStudentRequest request);

    Boolean suspendListStudent(List<SuspendStudentRequest> request);
    Boolean transferListStudent(List<TransferStudentRequest> request);

    Boolean mergeClass(MergeClassRequest request);
}
