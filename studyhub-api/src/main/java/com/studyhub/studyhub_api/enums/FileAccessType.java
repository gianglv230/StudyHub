package com.studyhub.studyhub_api.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum FileAccessType {
    PUBLIC("upload"),
    PRIVATE("private"),
    AUTHENTICATED("authenticated")
    ;

    private final String type;
}
