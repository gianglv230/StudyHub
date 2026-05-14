package com.studyhub.studyhub_api.model.audit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.LastModifiedBy;

@MappedSuperclass
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonIgnoreProperties(
        value = { "updatedBy"},
        allowGetters = true
)
public abstract class FullAudit extends OwnerAudit {
    @LastModifiedBy
    @Column(name = "updated_by")
    Integer updatedBy;
}
