package com.studyhub.studyhub_api.model;

import com.studyhub.studyhub_api.model.audit.OwnerAudit;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "class_lesson_config")
public class ClassLessonConfig extends OwnerAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_lesson_config_id", nullable = false)
    Integer id;

    @ToString.Exclude
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "class_id", nullable = false)
    Class classField;

    @ToString.Exclude
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "class_lesson_id", nullable = false)
    ClassLesson classLesson;

    @NotNull
    @Column(name = "order_index", nullable = false)
    Integer orderIndex;

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

}