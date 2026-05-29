//package com.studyhub.studyhub_api.model;
//
//import jakarta.persistence.*;
//import jakarta.validation.constraints.NotNull;
//import lombok.*;
//import lombok.experimental.FieldDefaults;
//
//@Getter
//@Setter
//@Builder
//@NoArgsConstructor
//@AllArgsConstructor
//@ToString
//@FieldDefaults(level = AccessLevel.PRIVATE)
//@Entity
//@Table(name = "material")
//public class Material {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "material_id", nullable = false)
//    Integer id;
//
//    @ToString.Exclude
//    @NotNull
//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "resource_id", nullable = false)
//    Resource resource;
//
//    @ToString.Exclude
//    @NotNull
//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "content_id", nullable = false)
//    Content content;
//
//}