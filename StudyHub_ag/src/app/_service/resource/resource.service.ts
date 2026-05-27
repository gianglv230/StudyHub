import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { BaseService } from '../base/base.service';
import { API_ENDPOINTS } from '../base/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ResourceService extends BaseService<ClassLiteResponse> {
  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS.RESOURCE);
  }

  // Định nghĩa luồng sự kiện refresh
  private folderRefreshSubject = new Subject<void>();
  folderRefresh$ = this.folderRefreshSubject.asObservable();
  triggerRefreshFolder() {
    this.folderRefreshSubject.next();
  }

  getMyFolders(id?: string): Observable<ApiResponse<FolderResourceResponse>> {
    return this.customRequest(
      'GET',
      API_ENDPOINTS.RESOURCE_ENDPOINTS.FOLDER,
      null,
      id ? { id } : undefined,
    );
  }

  addFolder(
    request: AddFolderResourceRequest,
  ): Observable<ApiResponse<Boolean>> {
    return this.customRequest(
      'POST',
      API_ENDPOINTS.RESOURCE_ENDPOINTS.FOLDER,
      request,
    );
  }

  renameFolder(
    request: RenameFolderResourceRequest,
  ): Observable<ApiResponse<Boolean>> {
    return this.customRequest(
      'PUT',
      API_ENDPOINTS.RESOURCE_ENDPOINTS.FOLDER,
      request,
    );
  }

  deleteFolder(id: number): Observable<ApiResponse<Boolean>> {
    return this.customRequest(
      'DELETE',
      `${API_ENDPOINTS.RESOURCE_ENDPOINTS.FOLDER}/${id}`,
    );
  }

  uploadResource(
    request: UploadResourceRequest,
  ): Observable<ApiResponse<Boolean>> {
    const formData = new FormData();
    formData.append('file', request.file);
    if (
      request.resourceParentId !== undefined &&
      request.resourceParentId !== null
    ) {
      formData.append('resourceParentId', request.resourceParentId.toString());
    }
    if (request.courseId !== undefined && request.courseId !== null) {
      formData.append('courseId', request.courseId.toString());
    }
    if (request.classId !== undefined && request.classId !== null) {
      formData.append('classId', request.classId.toString());
    }
    if (request.classLessonId !== undefined && request.classLessonId !== null) {
      formData.append('classLessonId', request.classLessonId.toString());
    }
    if (request.isPublic !== undefined && request.isPublic !== null) {
      formData.append('isPublic', request.isPublic.toString());
    } else {
      formData.append('isPublic', 'false');
    }

    return this.customRequest(
      'POST',
      API_ENDPOINTS.RESOURCE_ENDPOINTS.FILE,
      formData,
    );
  }

  updateFile(request: UpdateResourceRequest): Observable<ApiResponse<Boolean>> {
    const formData = new FormData();
    formData.append('id', request.id.toString());
    formData.append('file', request.file);
    return this.customRequest(
      'PUT',
      API_ENDPOINTS.RESOURCE_ENDPOINTS.FILE,
      formData,
    );
  }

  deleteFile(resourceId: number): Observable<ApiResponse<Boolean>> {
    return this.customRequest(
      'DELETE',
      `${API_ENDPOINTS.RESOURCE_ENDPOINTS.FILE}/${resourceId}`,
    );
  }
}
