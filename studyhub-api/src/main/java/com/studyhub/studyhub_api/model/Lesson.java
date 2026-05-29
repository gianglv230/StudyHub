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
@Table(name = "lesson")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lesson_id", nullable = false)
    Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "course_id", nullable = false)
    Course course;

    @Size(max = 255)
    @NotNull
    @Column(name = "title", nullable = false)
    String title;

    @NotNull
    @Column(name = "order_index", nullable = false)
    Integer orderIndex;

//    @ToString.Exclude
//    @OneToMany(mappedBy = "lesson")
//    Set<ClassLesson> classLessons = new LinkedHashSet<>();

}