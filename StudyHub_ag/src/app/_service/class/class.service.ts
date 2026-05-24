import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '../base/base.service';
import { API_ENDPOINTS } from '../base/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ClassService extends BaseService<ClassLiteResponse> {
  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS.CLASS);
  }

  getClassLessonOfClass(slug: string): Observable<ApiResponse<ClassLessonResponse>>{
    return this.customRequest(
      'GET',
      `${API_ENDPOINTS.CLASS_ENDPOINTS.CLASS_LESSON}/${slug}`,
    )
  }
}
