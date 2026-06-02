import { Injectable } from '@angular/core';
import { BaseService } from '../../../../_service/base/base.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../_service/base/api-endpoints';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminEnrollmentService extends BaseService<CourseLiteProjection> {
  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS.ENROLLMENT);
  }

  // Định nghĩa luồng sự kiện refresh
  private studentRefreshSubject = new Subject<void>();
  studentRefresh$ = this.studentRefreshSubject.asObservable();
  triggerRefreshStudentClass() {
    this.studentRefreshSubject.next();
  }

  getStudentInClass(
    classSlug: string,
  ): Observable<ApiResponse<StudentInClassResponse>> {
    return this.customRequest(
      'GET',
      API_ENDPOINTS.COURSE_ENPOINTS.ADMIN + '/' + classSlug,
    );
  }

  addStudent(request: AddStudentRequest): Observable<ApiResponse<Boolean>>{
    return this.customRequest(
      'POST',
      API_ENDPOINTS.ATTENDANCE_ENDPOINTS.ADMIN_ADD,
      request
    )
  }

  suspendStudent(request: SuspendStudentRequest): Observable<ApiResponse<Boolean>>{
    return this.customRequest(
      'PUT',
      API_ENDPOINTS.ATTENDANCE_ENDPOINTS.ADMIN_SUSPEND,
      request
    )
  }

  transferStudent(request: TransferStudentRequest): Observable<ApiResponse<Boolean>>{
    return this.customRequest(
      'POST',
      API_ENDPOINTS.ATTENDANCE_ENDPOINTS.ADMIN_TRANSFER,
      request
    )
  }
}
