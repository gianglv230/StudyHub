interface AddFolderResourceRequest {
  resourceName: string;
  resourceParentId: number | null;
}

interface RenameFolderResourceRequest {
  id: number;
  resourceName: string;
}

interface UploadResourceRequest {
  file: File;
  resourceParentId?: number; // Thêm '?' nếu các trường này có thể null/undefined
  courseId?: number;
  classId?: number;
  classLessonId?: number;
  isPublic?: boolean;
}

interface UpdateResourceRequest {
  id: number;
  file: File;
}
