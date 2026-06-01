import { Injectable } from '@angular/core';
import { BaseService } from '../../../../_service/base/base.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../_service/base/api-endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminEnrollmentService extends BaseService<CourseLiteProjection> {
  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS.ENROLLMENT);
  }

  getStudentInClass(
    classSlug: string,
  ): Observable<ApiResponse<StudentInClassResponse>> {
    return this.customRequest(
      'GET',
      API_ENDPOINTS.COURSE_ENPOINTS.ADMIN + '/' + classSlug,
    );
  }
}
