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
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "resource")
public class Resource extends OwnerAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "resource_id", nullable = false)
    Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "resource_name", nullable = false)
    String resourceName;

    @Size(max = 255)
    @NotNull
    @Column(name = "url", nullable = true)
    String url;

    @Size(max = 255)
    @NotNull
    @Column(name = "path", nullable = false)
    String path;

    @Size(max = 255)
    @NotNull
    @Column(name = "resource_type", nullable = false)
    String resourceType;

    @NotNull
    @Column(name = "is_public", nullable = false)
    Boolean isPublic = false;

    @Column(name = "public_id")
    Integer publicId;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "resource_parent")
    Resource resourceParent;

    @ToString.Exclude
    @OneToMany(mappedBy = "resourceParent")
    Set<Resource> children = new LinkedHashSet<>();

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
    @OneToMany(mappedBy = "thumbnailOverride")
    Set<Class> classes = new LinkedHashSet<>();

    @ToString.Exclude
    @OneToMany(mappedBy = "videoContent")
    Set<Content> contents = new LinkedHashSet<>();

    @ToString.Exclude
    @OneToMany(mappedBy = "thumbnail")
    Set<Course> thumbnailCourses = new LinkedHashSet<>();

    @ToString.Exclude
    @OneToMany(mappedBy = "videoDemo")
    Set<Course> videoCourses = new LinkedHashSet<>();

    @ToString.Exclude
    @OneToMany(mappedBy = "resource")
    Set<Material> materials = new LinkedHashSet<>();

}