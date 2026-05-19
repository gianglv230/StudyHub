package com.studyhub.studyhub_api.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CloudinaryResponse {
    String publicId;
    String url;
}
