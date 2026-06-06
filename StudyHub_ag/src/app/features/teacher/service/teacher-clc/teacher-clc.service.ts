import { Injectable } from '@angular/core';
import { BaseService } from '../../../../_service/base/base.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../_service/base/api-endpoints';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeacherClcService extends BaseService<AddClassLessonConfigRequest> {
  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS.CLC);
  }

  // Định nghĩa luồng sự kiện refresh
    private clcRefreshSubject = new Subject<void>();
    lessonRefresh$ = this.clcRefreshSubject.asObservable();
    triggerRefreshClassLesson() {
      this.clcRefreshSubject.next();
    }
}
