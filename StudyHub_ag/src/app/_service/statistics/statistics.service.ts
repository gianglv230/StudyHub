import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../base/api-endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService extends BaseService<CourseLiteProjection> {
  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS.STATISTICS);
  }

  getBasicStatistics(): Observable<ApiResponse<StatisticsBasicResponse>> {
    return this.customRequest('GET', API_ENDPOINTS.STATISTICS_ENDPOINTS.BASIC);
  }

  getRevenueStatisticsByYear(
    year = 2026,
  ): Observable<ApiResponse<RevenueStatisticsResponse[]>> {
    return this.customRequest(
      'GET',
      `${API_ENDPOINTS.STATISTICS_ENDPOINTS.REVENUE_YEAR}/${year}`,
    );
  }
}
