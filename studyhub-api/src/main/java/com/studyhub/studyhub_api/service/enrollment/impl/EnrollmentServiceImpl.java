package com.studyhub.studyhub_api.service.enrollment.impl;

import com.studyhub.studyhub_api.dto.request.enrollment.AddStudentRequest;
import com.studyhub.studyhub_api.dto.request.enrollment.MergeClassRequest;
import com.studyhub.studyhub_api.dto.request.enrollment.SuspendStudentRequest;
import com.studyhub.studyhub_api.dto.request.enrollment.TransferStudentRequest;
import com.studyhub.studyhub_api.dto.response.enrollment.AttendanceEnrollmentResponse;
import com.studyhub.studyhub_api.dto.response.enrollment.CountAttendanceProjection;
import com.studyhub.studyhub_api.dto.response.enrollment.StudentInClassResponse;
import com.studyhub.studyhub_api.enums.*;
import com.studyhub.studyhub_api.exception.AppException;
import com.studyhub.studyhub_api.exception.ErrorCode;
import com.studyhub.studyhub_api.mapper.EnrollmentMapper;
import com.studyhub.studyhub_api.mapper.UserAccountMapper;
import com.studyhub.studyhub_api.model.Enrollment;
import com.studyhub.studyhub_api.model.Invoice;
import com.studyhub.studyhub_api.model.UserAccount;
import com.studyhub.studyhub_api.repository.*;
import com.studyhub.studyhub_api.service.auth.AuthenticationService;
import com.studyhub.studyhub_api.service.enrollment.EnrollmentService;
import com.studyhub.studyhub_api.model.Class;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
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
    ClassRepository classRepository;
    InvoiceRepository invoiceRepository;
    UserAccountRepository userAccountRepository;
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
        List<Enrollment> enrollments = enrollmentRepository.findAllStudentByClassSlug(classSlug);
        List<CountAttendanceProjection> attendanceProjections = attendanceRepository.countAttendanceByClassSlug(classSlug);

        Map<Integer, Integer> presentMap = toAttendanceMap(attendanceProjections, StatusAttendance.PRESENT);
        Map<Integer, Integer> absentMap = toAttendanceMap(attendanceProjections, StatusAttendance.ABSENT);

        return enrollments.stream()
                .map(enrollment -> {
                    UserAccount student = enrollment.getStudent();
                    Integer studentId = student.getId();
                    Integer numberOfPresent = presentMap.getOrDefault(studentId, 0);
                    Integer numberOfAbsent = absentMap.getOrDefault(studentId, 0);

                    return userAccountMapper
                            .toStudentInClassResponse(student, numberOfPresent, numberOfAbsent, enrollment.getId(), enrollment.getStatus());
                })
                .toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public Boolean addStudent(AddStudentRequest request) {
        Class clazz = classRepository.findBySlug(request.getClassSlug())
                .orElseThrow(() -> new AppException(ErrorCode.CLASS_NOT_EXISTED));
        UserAccount student = userAccountRepository.findById(request.getStudentId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // Check student exist in class
        boolean hasEnrollment = enrollmentRepository.existsByClassFieldIdAndStudentIdAndStatusEqualsIgnoreCase(clazz.getId(), student.getId(), StatusEnrollment.ACTIVE.name());
        if (hasEnrollment) {
            throw new AppException(ErrorCode.ENROLLMENT_EXISTED);
        }

        // Add enrollment
        Enrollment enrollment = Enrollment.builder()
                .student(student)
                .classField(clazz)
                .status(StatusEnrollment.ACTIVE.name())
                .startDate(LocalDate.now())
                .endDate(null)
                .build();

        enrollmentRepository.save(enrollment);

        // Add invoice
        BigDecimal amount = request.getAmount();
        BigDecimal adjustments = request.getAdjustments();
        boolean isPaid = request.getStatus().equalsIgnoreCase(StatusInvoice.PAID.name());

        Invoice invoice = Invoice.builder()
                .enrollment(enrollment)
                .amount(amount)
                .adjustments(adjustments)
                .finalAmount(amount.add(adjustments))
                .status(request.getStatus())
                .dueDate(request.getDueDate())
                .paidAt(isPaid ? Instant.now() : null)
                .method(request.getMethod())
                .type(TypeInvoice.PAYMENT.name())
                .build();

        invoiceRepository.save(invoice);

        return true;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    @Override
    public Boolean suspendStudent(SuspendStudentRequest request) {
        Enrollment enrollment = enrollmentRepository.findById(request.getEnrollmentId())
                .orElseThrow(() -> new AppException(ErrorCode.ENROLLMENT_NOT_EXISTED));

        // Update enrollment
        enrollment.setStatus(StatusEnrollment.SUSPENDED.name());
        enrollment.setEndDate(LocalDate.now());

        enrollmentRepository.save(enrollment);

        // Update invoice
        boolean existUnpaidEnrollment = !invoiceRepository.existsByEnrollmentIdAndStatusIn(request.getEnrollmentId(), List.of(StatusInvoice.OVERDUE.name(), StatusInvoice.PENDING.name()));
        if(existUnpaidEnrollment) { return true; }

        BigDecimal amount = request.getAmount();
        BigDecimal adjustments = request.getAdjustments();
        Instant now = Instant.now();

        Invoice invoice = Invoice.builder()
                .enrollment(enrollment)
                .amount(amount)
                .adjustments(adjustments)
                .finalAmount(amount.add(adjustments))
                .status(StatusInvoice.REFUNDED.name())
                .dueDate(LocalDate.from(now))
                .paidAt(now)
                .method(request.getMethod())
                .type(TypeInvoice.REFUND.name())
                .build();

        invoiceRepository.save(invoice);

        return true;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    @Override
    public Boolean transferStudent(TransferStudentRequest request) {
        Enrollment enrollment = enrollmentRepository.findById(request.getEnrollmentId())
                .orElseThrow(() -> new AppException(ErrorCode.ENROLLMENT_NOT_EXISTED));

        // Cancel present enrollment
        enrollment.setStatus(StatusEnrollment.CANCELLED.name());
        enrollment.setEndDate(LocalDate.now());

        enrollmentRepository.save(enrollment);

        // Cancel present invoice
        List<Invoice> invoices = invoiceRepository.findByEnrollmentIdAndStatusIn(request.getEnrollmentId(), List.of(StatusInvoice.OVERDUE.name(), StatusInvoice.PENDING.name()));
        if (!invoices.isEmpty()) {
            invoices.forEach(invoice ->
                    invoice.setStatus(StatusInvoice.CANCELED.name())
            );
            invoiceRepository.saveAll(invoices);
        }

        // Create new enrollment
        Class clazz = classRepository.findBySlug(request.getNewClassSlug())
                .orElseThrow(() -> new AppException(ErrorCode.CLASS_NOT_EXISTED));
        UserAccount student = userAccountRepository.findById(request.getStudentId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // Check student exist in class
        boolean hasEnrollment = enrollmentRepository.existsByClassFieldIdAndStudentIdAndStatusEqualsIgnoreCase(clazz.getId(), student.getId(), StatusEnrollment.ACTIVE.name());
        if (hasEnrollment) {
            throw new AppException(ErrorCode.ENROLLMENT_EXISTED);
        }

        // Add enrollment
        Enrollment transferEnrollment = Enrollment.builder()
                .student(student)
                .classField(clazz)
                .status(StatusEnrollment.ACTIVE.name())
                .startDate(LocalDate.now())
                .endDate(null)
                .build();

        enrollmentRepository.save(transferEnrollment);

        // Add invoice
        BigDecimal amount = request.getAmount();
        BigDecimal adjustments = request.getAdjustments();
        boolean isPaid = request.getStatus().equalsIgnoreCase(StatusInvoice.PAID.name());

        Invoice invoice = Invoice.builder()
                .enrollment(transferEnrollment)
                .amount(amount)
                .adjustments(adjustments)
                .finalAmount(amount.add(adjustments))
                .status(request.getStatus())
                .dueDate(request.getDueDate())
                .paidAt(isPaid ? Instant.now() : null)
                .method(request.getMethod())
                .type(TypeInvoice.PAYMENT.name())
                .build();

        invoiceRepository.save(invoice);

        return true;
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public Boolean suspendListStudent(List<SuspendStudentRequest> request) {
        request.forEach(this::suspendStudent);
        return true;
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public Boolean transferListStudent(List<TransferStudentRequest> request) {
        request.forEach(this::transferStudent);
        return true;
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public Boolean mergeClass(MergeClassRequest request) {
        request.transferStudentRequestList().forEach(this::transferStudent);
        Class clazz = classRepository.findById(request.mergedClassId())
                .orElseThrow(() -> new AppException(ErrorCode.CLASS_NOT_EXISTED));
        clazz.setStatus(StatusClass.CANCELED.name());
        classRepository.save(clazz);
        return true;
    }
}
