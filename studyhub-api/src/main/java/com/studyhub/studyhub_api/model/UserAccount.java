package com.studyhub.studyhub_api.model;

import com.studyhub.studyhub_api.model.audit.FullAudit;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "user_account")
public class UserAccount extends FullAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_account_id", nullable = false)
    Integer id;

    @Size(max = 40)
    @NotNull
    @Column(name = "username", nullable = false, length = 40)
    String username;

    @Size(max = 255)
    @NotNull
    @Column(name = "password", nullable = false)
    String password;

    @Size(max = 40)
    @NotNull
    @Column(name = "first_name", nullable = false, length = 40)
    String firstName;

    @Size(max = 10)
    @NotNull
    @Column(name = "last_name", nullable = false, length = 10)
    String lastName;

    @NotNull
    @Column(name = "gender", nullable = false)
    Boolean gender = false;

    @NotNull
    @Column(name = "date_of_birth", nullable = false)
    LocalDate dateOfBirth;

    @Size(max = 255)
    @NotNull
    @Column(name = "email", nullable = false)
    String email;

    @Size(max = 10)
    @NotNull
    @Column(name = "phone", nullable = false, length = 10)
    String phone;

    @Size(max = 255)
    @NotNull
    @Column(name = "hometown", nullable = false)
    String hometown;

    @Size(max = 255)
    @NotNull
    @Column(name = "address", nullable = false)
    String address;

    @Size(max = 255)
    @Column(name = "avatar")
    String avatar;

    @Size(max = 30)
    @NotNull
    @Column(name = "role", nullable = false, length = 30)
    String role;

    @NotNull
    @Column(name = "start_date", nullable = false)
    LocalDate startDate;

    @Column(name = "end_date")
    LocalDate endDate;

    @Size(max = 30)
    @NotNull
    @Column(name = "status", nullable = false, length = 30)
    String status;

//    @Column(name = "created_at")
//    Instant createdAt;
//
//    @ToString.Exclude
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "created_by")
//    UserAccount createdBy;
//
//    @Column(name = "updated_at")
//    Instant updatedAt;
//
//    @ToString.Exclude
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "updated_by")
//    UserAccount updatedBy;

//    @ToString.Exclude
//    @OneToMany(mappedBy = "createdBy")
//    Set<Attendance> createdAttendances = new LinkedHashSet<>();
//
//    @ToString.Exclude
//    @OneToMany(mappedBy = "updatedBy")
//    Set<Attendance> updatedAttendances = new LinkedHashSet<>();
//
//    @ToString.Exclude
//    @OneToMany(mappedBy = "teacher")
//    Set<Class> teacher = new LinkedHashSet<>();
//
//    @ToString.Exclude
//    @OneToMany(mappedBy = "createdBy")
//    Set<Class> createdClass = new LinkedHashSet<>();
//
//    @ToString.Exclude
//    @OneToMany(mappedBy = "updatedBy")
//    Set<Class> updatedClass = new LinkedHashSet<>();
//
//    @ToString.Exclude
//    @OneToMany(mappedBy = "createdBy")
//    Set<ClassLesson> classLessons = new LinkedHashSet<>();
//
//    @ToString.Exclude
//    @OneToMany(mappedBy = "createdBy")
//    Set<ClassLessonConfig> classLessonConfigs = new LinkedHashSet<>();
//
//    @ToString.Exclude
//    @OneToMany(mappedBy = "createdBy")
//    Set<Course> createdCourses = new LinkedHashSet<>();
//
//    @ToString.Exclude
//    @OneToMany(mappedBy = "updatedBy")
//    Set<Course> updatedCourses = new LinkedHashSet<>();
//
//    @ToString.Exclude
//    @OneToMany(mappedBy = "student")
//    Set<Enrollment> enrollments = new LinkedHashSet<>();
//
//    @ToString.Exclude
//    @OneToMany(mappedBy = "createdBy")
//    Set<Enrollment> createdEnrollments = new LinkedHashSet<>();
//
//    @ToString.Exclude
//    @OneToMany(mappedBy = "updatedBy")
//    Set<Enrollment> updatedEnrollments = new LinkedHashSet<>();
//
//    @ToString.Exclude
//    @OneToMany(mappedBy = "createdBy")
//    Set<Invoice> createdInvoices = new LinkedHashSet<>();
//
//    @ToString.Exclude
//    @OneToMany(mappedBy = "createdBy")
//    Set<Resource> resources = new LinkedHashSet<>();
//
//    @ToString.Exclude
//    @OneToMany(mappedBy = "createdBy")
//    Set<UserAccount> createdUserAccounts = new LinkedHashSet<>();
//
//    @ToString.Exclude
//    @OneToMany(mappedBy = "updatedBy")
//    Set<UserAccount> updatedUserAccounts = new LinkedHashSet<>();

    public String getFullname(){
        return this.firstName + " " + this.lastName;
    }
}