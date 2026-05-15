package com.studyhub.studyhub_api.repository;

import com.studyhub.studyhub_api.model.Invoice;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {

    @EntityGraph(attributePaths = {"enrollment", "enrollment.student", "enrollment.classField"})
    List<Invoice> findByEnrollmentStudentId(int studentId);
}
