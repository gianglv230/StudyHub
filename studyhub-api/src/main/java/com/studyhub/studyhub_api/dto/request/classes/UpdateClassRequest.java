package com.studyhub.studyhub_api.dto.request.classes;

import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@SuperBuilder
public class UpdateClassRequest extends AdminClassBaseRequest {
    Integer id;
}
