import { Injectable } from '@angular/core';
import { BaseService } from '../../../../_service/base/base.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../_service/base/api-endpoints';
import { BehaviorSubject, Observable } from 'rxjs';

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
    return this.customRequest('POST', '/' + classSlug, request);
  }

  updateClassLesson(
    classSlug: string,
    request: ClassLessonTeacherRequest,
  ): Observable<ApiResponse<Boolean>> {
    return this.customRequest('PUT', '/' + classSlug, request);
  }

  // Sử dụng BehaviorSubject để lưu trữ section hiện tại đang được chọn (mặc định ban đầu là null)
  private selectedSectionSubject =
    new BehaviorSubject<SectionTeacherResponse | null>(null);

  // Expose ra ngoài dưới dạng Observable để các component khác subscribe (pipe/lắng nghe)
  selectedSection$: Observable<SectionTeacherResponse | null> =
    this.selectedSectionSubject.asObservable();

  // Hàm này dùng để phát sự kiện khi click
  selectSection(section: SectionTeacherResponse): void {
    this.selectedSectionSubject.next(section);
  }

  // Hàm để reset nếu cần
  clearSelectedSection(): void {
    this.selectedSectionSubject.next(null);
  }
}
