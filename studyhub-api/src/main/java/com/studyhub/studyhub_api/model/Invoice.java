package com.studyhub.studyhub_api.model;

import com.studyhub.studyhub_api.model.audit.FullAudit;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "invoice")
public class Invoice extends FullAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "invoice_id", nullable = false)
    Integer id;

    @ToString.Exclude
    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "enrollment_id", nullable = false)
    Enrollment enrollment;

    @NotNull
    @Column(name = "amount", nullable = false, precision = 19, scale = 3)
    BigDecimal amount;

    @Column(name = "adjustments", precision = 19, scale = 3)
    BigDecimal adjustments;

    @NotNull
    @Column(name = "final_amount", nullable = false, precision = 19, scale = 3)
    BigDecimal finalAmount;

    @Size(max = 30)
    @NotNull
    @Column(name = "status", nullable = false, length = 30)
    String status;

    @NotNull
    @Column(name = "due_date", nullable = false)
    LocalDate dueDate;

    @Column(name = "order_code")
    Integer orderCode;

    @Column(name = "paid_at")
    Instant paidAt;

    @Size(max = 30)
    @Column(name = "method", length = 30)
    String method;

    @Size(max = 30)
    @NotNull
    @Column(name = "type", nullable = false, length = 30)
    String type;

//    @NotNull
//    @Column(name = "created_at", nullable = false)
//    Instant createdAt;
//
//    @ToString.Exclude
//    @NotNull
//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "created_by", nullable = false)
//    UserAccount createdBy;

}