package com.studyhub.studyhub_api.model;

import com.studyhub.studyhub_api.model.audit.FullAudit;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
@Table(name = "attendance")
public class Attendance extends FullAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attendance_id", nullable = false)
    Integer id;

    @ToString.Exclude
    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "enrollment_id", nullable = false)
    Enrollment enrollment;

    @NotNull
    @Column(name = "session_date", nullable = false)
    LocalDate sessionDate;

    @Size(max = 30)
    @NotNull
    @Column(name = "status", nullable = false, length = 30)
    String status;

    @Size(max = 255)
    @Column(name = "note")
    String note;

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

}