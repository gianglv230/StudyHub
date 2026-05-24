import { Injectable } from '@angular/core';
import { BaseService } from '../../../../_service/base/base.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../_service/base/api-endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentAttendanceService extends BaseService<StudentAttendanceResponse> {
  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS.ATTENDANCE);
  }

  getMyStudentAttendanceClass(
    slug: string,
  ): Observable<ApiResponse<StudentAttendanceResponse>> {
    return this.customRequest(
      'GET',
      `${API_ENDPOINTS.ATTENDANCE_ENDPOINTS.STUDENT}/${slug}`,
    );
  }
}
