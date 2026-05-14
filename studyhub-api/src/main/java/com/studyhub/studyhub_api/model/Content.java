package com.studyhub.studyhub_api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
@Table(name = "content")
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "content_id", nullable = false)
    Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "section_id", nullable = false)
    Section section;

    @NotNull
    @Column(name = "class_lesson_id", nullable = false)
    Integer classLessonId;

    @Size(max = 255)
    @NotNull
    @Column(name = "content_name", nullable = false)
    String contentName;

//    @Lob
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

    @ToString.Exclude
    @OneToMany(mappedBy = "content")
    Set<Material> materials = new LinkedHashSet<>();

}