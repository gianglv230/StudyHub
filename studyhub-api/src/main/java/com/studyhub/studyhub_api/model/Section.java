package com.studyhub.studyhub_api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.type.SqlTypes;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
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

    @Column(name = "description", columnDefinition = "MEDIUMTEXT")
    String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_content")
    Resource videoContent;

    //    @Lob
    @Column(name = "text_content", columnDefinition = "MEDIUMTEXT")
    String textContent;

    @NotNull
    @Column(name = "order_index", nullable = false)
    Integer orderIndex;

    @Size(max = 30)
    @NotNull
    @Column(name = "type", nullable = false, length = 30)
    String type;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "materials")
    List<Integer> materials = new ArrayList<>();

//    @ToString.Exclude
//    @OneToMany(mappedBy = "section", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
//    Set<Content> contents = new LinkedHashSet<>();

}