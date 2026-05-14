package com.studyhub.studyhub_api.model;

import com.studyhub.studyhub_api.model.audit.OwnerAudit;
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
@Table(name = "class_lesson")
public class ClassLesson extends OwnerAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_lesson_id", nullable = false)
    Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "slug", nullable = false)
    String slug;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id")
    Lesson lesson;

    @Size(max = 255)
    @NotNull
    @Column(name = "title_override", nullable = false)
    String titleOverride;

    @NotNull
    @Column(name = "is_deleted", nullable = false)
    Boolean isDeleted = false;

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

    @ToString.Exclude
    @OneToMany(mappedBy = "classLesson")
    Set<ClassLessonConfig> classLessonConfigs = new LinkedHashSet<>();

    @ToString.Exclude
    @OneToMany(mappedBy = "classLesson", cascade = CascadeType.ALL, orphanRemoval = true)
    Set<Section> sections = new LinkedHashSet<>();

}