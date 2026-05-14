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
@Table(name = "class")
public class Class extends FullAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_id", nullable = false)
    Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "slug", nullable = false)
    String slug;

    @ToString.Exclude
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    Course course;

    @ToString.Exclude
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "teacher_id")
    UserAccount teacher;

    @Size(max = 255)
    @NotNull
    @Column(name = "class_name", nullable = false)
    String className;

    @ToString.Exclude
    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "thumbnail_override", nullable = false)
    Resource thumbnailOverride;

    @NotNull
    @Column(name = "opening_date", nullable = false)
    LocalDate openingDate;

    @NotNull
    @Column(name = "start_date", nullable = false)
    LocalDate startDate;

    @NotNull
    @Column(name = "end_date", nullable = false)
    LocalDate endDate;

    @Size(max = 255)
    @NotNull
    @Column(name = "class_schedule", nullable = false)
    String classSchedule;

    @NotNull
    @Column(name = "price", nullable = false, precision = 19, scale = 3)
    BigDecimal price;

    @NotNull
    @Column(name = "max_students", nullable = false)
    Integer maxStudents;

    @NotNull
    @Column(name = "available_slots", nullable = false)
    Integer availableSlots;

    @Size(max = 30)
    @NotNull
    @Column(name = "status", nullable = false, length = 30)
    String status;

//    @NotNull
//    @Column(name = "created_at", nullable = false)
//    Instant createdAt;
//
//    @NotNull
//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "created_by", nullable = false)
//    UserAccount createdBy;
//
//    @Column(name = "updated_at")
//    Instant updatedAt;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "updated_by")
//    UserAccount updatedBy;

    @ToString.Exclude
    @OneToMany(mappedBy = "classField")
    Set<ClassLessonConfig> classLessonConfigs = new LinkedHashSet<>();

    @ToString.Exclude
    @OneToMany(mappedBy = "classField")
    Set<Enrollment> enrollments = new LinkedHashSet<>();

}