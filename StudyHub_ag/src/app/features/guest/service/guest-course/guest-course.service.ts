import { Injectable } from '@angular/core';
import { BaseService } from '../../../../_service/base/base.service';
import { API_ENDPOINTS } from '../../../../_service/base/api-endpoints';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuestCourseService extends BaseService<CourseLiteProjection> {
  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS.COURSE);
  }

  getHotCourse(): Observable<ApiResponse<CourseLiteProjection[]>> {
    return this.customRequest<CourseLiteProjection[]>(
      'GET',
      API_ENDPOINTS.COURSE_ENPOINTS.COURSE_HOT,
    );
  }

  getNewCourse(): Observable<ApiResponse<CourseLiteProjection[]>> {
    return this.customRequest<CourseLiteProjection[]>(
      'GET',
      API_ENDPOINTS.COURSE_ENPOINTS.COURSE_NEW,
    );
  }

  findCourse(
    title: string = '',
    page: number = 0,
  ): Observable<ApiResponse<PageResponse<CourseLiteProjection>>> {
    return this.customRequest<PageResponse<CourseLiteProjection>>(
      'GET',
      API_ENDPOINTS.COURSE_ENPOINTS.FIND,
      null,
      {
        title: title,
        page: page,
      },
    );
  }

  getOptionsFilter(): Observable<ApiResponse<CourseFilterOptionsResponse>> {
    return this.customRequest<CourseFilterOptionsResponse>(
      'GET',
      API_ENDPOINTS.COURSE_ENPOINTS.FILTER_OPTION,
    );
  }

  filterCourse(
    page: number,
    subject: string,
    target: string,
    category: string,
  ): Observable<ApiResponse<PageResponse<CourseLiteProjection>>> {
    const params: any = {
      page,
      subject,
      target,
      category,
    };

    // Xóa param null, undefined, ''
    Object.keys(params).forEach((key) => {
      if (
        params[key] === null ||
        params[key] === undefined ||
        params[key] === ''
      ) {
        delete params[key];
      }
    });

    return this.customRequest(
      'GET',
      API_ENDPOINTS.COURSE_ENPOINTS.FILTER,
      null,
      params,
    );
  }

  getDetail(slug: string): Observable<ApiResponse<CourseDetailLiteResponse>>{
    return this.customRequest(
      'GET',
      `${API_ENDPOINTS.COURSE_ENPOINTS.DETAIL}/${slug}`
    )
  }
}
