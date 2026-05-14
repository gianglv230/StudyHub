package com.studyhub.studyhub_api.model;

import com.studyhub.studyhub_api.model.audit.FullAudit;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "enrollment")
public class Enrollment extends FullAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "enrollment_id", nullable = false)
    Integer id;

    @ToString.Exclude
    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    UserAccount student;

    @ToString.Exclude
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "class_id", nullable = false)
    Class classField;

    @Size(max = 30)
    @NotNull
    @Column(name = "status", nullable = false, length = 30)
    String status;

    @NotNull
    @Column(name = "start_date", nullable = false)
    LocalDate startDate;

    @Column(name = "end_date")
    LocalDate endDate;

//    @NotNull
//    @Column(name = "created_at", nullable = false)
//    Instant createdAt;
//
//    @ToString.Exclude
//    @NotNull
//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "created_by", nullable = false)
//    UserAccount createdBy;
//
//    @Column(name = "updated_at")
//    Instant updatedAt;
//
//    @ToString.Exclude
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "updated_by")
//    UserAccount updatedBy;

    @ToString.Exclude
    @OneToMany(mappedBy = "enrollment")
    Set<Attendance> attendances = new LinkedHashSet<>();

    @ToString.Exclude
    @OneToMany(mappedBy = "enrollment")
    Set<Invoice> invoices = new LinkedHashSet<>();

}