import { Injectable } from '@angular/core';
import { BaseService } from '../../../../_service/base/base.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../_service/base/api-endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeacherClassLessonService extends BaseService<CourseLiteProjection> {
  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS.CLASS_LESSON);
  }

  getClassLesson(
    classSlug: string,
    classLessonSlug: string,
  ): Observable<ApiResponse<ClassLessonTeacherResponse>> {
    return this.customRequest(
      'GET',
      `${API_ENDPOINTS.CLASS_LESSON_ENDPOINTS.TEACHER}/${classSlug}/${classLessonSlug}`,
    );
  }

  addClassLesson(
    classSlug: string,
    request: ClassLessonTeacherRequest,
  ): Observable<ApiResponse<String>> {
    return this.customRequest('POST', "/" + classSlug, request);
  }

  updateClassLesson(
    classSlug: string,
    request: ClassLessonTeacherRequest,
  ): Observable<ApiResponse<Boolean>> {
    return this.customRequest('PUT', "/" + classSlug, request);
  }
}
