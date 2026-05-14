package com.studyhub.studyhub_api.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.List;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {
    private int code = 0;
    private String message;
    private T data;
    private List<FieldErrorDetail> error;
}
