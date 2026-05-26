import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '../base/base.service';
import { API_ENDPOINTS } from '../base/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService extends BaseService<StudentAttendanceResponse> {
  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS.ATTENDANCE);
  }

  getSessionDate(slug: string): Observable<ApiResponse<SessionDateResponse>> {
    return this.customRequest(
      'GET',
      `${API_ENDPOINTS.ATTENDANCE_ENDPOINTS.SESSION_DATE}/${slug}`,
    );
  }

  getAttendanceRows(
    classSlug: string,
    sessionDate: string,
  ): Observable<ApiResponse<AttendanceRowResponse[]>> {
    return this.customRequest(
      'GET',
      `${API_ENDPOINTS.ATTENDANCE_ENDPOINTS.ROWS}/${classSlug}`,
      null,
      {
        'session-date': sessionDate,
      },
    );
  }

  getEnrollmentByClassSlug(
    classSlug: string,
  ): Observable<ApiResponse<AttendanceEnrollmentResponse[]>> {
    return this.customRequest(
      'GET',
      `${API_ENDPOINTS.ATTENDANCE_ENDPOINTS.ENROLLMENT}/${classSlug}`,
    );
  }

  addAttendance(
    classSlug: string,
    request: AddAttendanceRequest[],
  ): Observable<ApiResponse<AttendanceRowResponse[]>> {
    return this.customRequest<AttendanceRowResponse[]>(
      'POST',
      '/' + classSlug,
      request,
    );
  }

  updateAttendance(
    classSlug: string,
    request: UpdateAttendanceRequest[],
  ): Observable<ApiResponse<AttendanceRowResponse[]>> {
    return this.customRequest('PUT', '/' + classSlug, request);
  }
}
