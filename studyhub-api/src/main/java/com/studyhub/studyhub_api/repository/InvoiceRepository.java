package com.studyhub.studyhub_api.repository;

import com.studyhub.studyhub_api.dto.response.statistics.RevenueStatisticsProjection;
import com.studyhub.studyhub_api.model.Enrollment;
import com.studyhub.studyhub_api.model.Invoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Integer>, JpaSpecificationExecutor<Invoice> {

    @EntityGraph(attributePaths = {"enrollment", "enrollment.student", "enrollment.classField"})
    List<Invoice> findByEnrollmentStudentId(int studentId);

    Page<Invoice> findAll(Specification<Invoice> spec, Pageable pageable);

    @Query("""
        SELECT DISTINCT year(i.paidAt)
        FROM Invoice i
        WHERE (i.status = 'PAID' OR i.status = 'REFUNDED')
    """)
    List<Integer> getDistinctYear();

    @Query("""
        SELECT month(i.paidAt) as revenueMonth, i.status as status, COALESCE(SUM(i.finalAmount), 0) as sumRevenue
        FROM Invoice i
        WHERE (i.status = 'PAID' OR i.status = 'REFUNDED') AND YEAR(i.paidAt) = :year
        GROUP BY revenueMonth, status
    """)
    List<RevenueStatisticsProjection> getRevenueMonth(int year);

    Boolean existsByEnrollmentIdAndStatusIn(int enrollmentId, List<String> statuses);
    List<Invoice> findByEnrollmentIdAndStatusIn(int enrollmentId, List<String> statuses);

    List<Invoice> findByDueDateAndStatusEqualsIgnoreCase(LocalDate dueDate, String status);

    Optional<Invoice> findByIdAndStatusIn(Integer invoiceId, List<String> statuses);
//    Optional<Invoice> findByOrderCodeAndStatusIn(Integer orderCode, List<String> statuses);
}
