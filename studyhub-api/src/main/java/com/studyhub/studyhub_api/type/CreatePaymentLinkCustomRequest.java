package com.studyhub.studyhub_api.type;

import lombok.*;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreatePaymentLinkCustomRequest {
    String productName;
    String description;
    String returnUrl;
    int price;
    String cancelUrl;
    Integer id;
}
