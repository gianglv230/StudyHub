package com.studyhub.studyhub_api.model.audit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

@MappedSuperclass
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(
        value = {"createdBy", "createdAt", "updatedAt"},
        allowGetters = true
)
public abstract class OwnerAudit {
    @CreatedBy
    @Column(name = "created_by", nullable = false, updatable = false)
    Integer createdBy;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    Instant updatedAt;
}
