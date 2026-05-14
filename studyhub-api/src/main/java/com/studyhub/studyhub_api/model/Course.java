package com.studyhub.studyhub_api.model;

import com.studyhub.studyhub_api.model.audit.FullAudit;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
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
@Table(name = "course")
public class Course extends FullAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id", nullable = false)
    Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "slug", nullable = false)
    String slug;

    @Size(max = 255)
    @NotNull
    @Column(name = "title", nullable = false)
    String title;

//    @Lob
    @Column(name = "description", columnDefinition = "MEDIUMTEXT")
    String description;

    @Size(max = 255)
    @NotNull
    @Column(name = "category_name", nullable = false)
    String categoryName;

    @Size(max = 255)
    @NotNull
    @Column(name = "target_grade", nullable = false)
    String targetGrade;

    @Size(max = 255)
    @NotNull
    @Column(name = "subject", nullable = false)
    String subject;

    @ToString.Exclude
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "thumbnail")
    Resource thumbnail;

    @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_demo")
    Resource videoDemo;

    @NotNull
    @Column(name = "number_of_lessons", nullable = false)
    Integer numberOfLessons;

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
//    @Size(max = 255)
//    @Column(name = "updated_at")
//    String updatedAt;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "updated_by")
//    UserAccount updatedBy;

    @ToString.Exclude
    @OneToMany(mappedBy = "course")
    Set<Class> classes = new LinkedHashSet<>();

    @ToString.Exclude
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    Set<Lesson> lessons = new LinkedHashSet<>();

}