package com.studyhub.studyhub_api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
@Table(name = "section")
public class Section {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "section_id", nullable = false)
    Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "class_lesson_id", nullable = false)
    ClassLesson classLesson;

    @Size(max = 255)
    @NotNull
    @Column(name = "section_name", nullable = false)
    String sectionName;

    @NotNull
    @Column(name = "order_index", nullable = false)
    Integer orderIndex;

    @ToString.Exclude
    @OneToMany(mappedBy = "section", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    Set<Content> contents = new LinkedHashSet<>();

}