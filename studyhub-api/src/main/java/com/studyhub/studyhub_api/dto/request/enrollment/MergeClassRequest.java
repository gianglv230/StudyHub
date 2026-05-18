package com.studyhub.studyhub_api.dto.request.enrollment;

import java.util.List;

public record MergeClassRequest(
        Integer mergedClassId,
        List<TransferStudentRequest> transferStudentRequestList
) {
}
