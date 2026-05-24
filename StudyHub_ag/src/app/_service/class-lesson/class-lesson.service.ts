import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '../base/base.service';
import { API_ENDPOINTS } from '../base/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ClassLessonService extends BaseService<ClassLiteResponse> {
  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS.CLASS_LESSON);
  }

  getContensOfClass(
    classSlug: string,
    classLessonSlug: string,
  ): Observable<ApiResponse<LessonSectionResponse>> {
    return this.customRequest(
      'GET',
      `/${classSlug}/${classLessonSlug}${API_ENDPOINTS.CLASS_LESSON_ENDPOINTS.SECTIONS}`,
    );
  }
}
