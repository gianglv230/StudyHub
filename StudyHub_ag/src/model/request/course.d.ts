type CourseStatus = 'ACTIVE' | 'DRAFT';

interface LessonBaseRequest {
  title: string;
  orderIndex: number;
}

interface AddCourseRequest {
  slug: string;
  title: string;
  description?: string;
  categoryName: string;
  targetGrade: string;
  subject: string;
  thumbnailId: number;
  videoId: number;
  numberOfLessons: number; // Thay '= 0' bằng '?' nếu nó không bắt buộc
  status: CourseStatus;
  lessons?: LessonBaseRequest[]; // Thay '= []' bằng '?' nếu nó không bắt buộc
}

interface UpdateLessonRequest {
  id: number;
  title: string;
  orderIndex: number;
}

interface UpdateCourseRequest {
  id: number;
  slug: string;
  title: string;
  description?: string;
  categoryName: string;
  targetGrade: string;
  subject: string;
  thumbnailId: number;
  videoId: number;
  numberOfLessons: number; // Thay '= 0' bằng '?' nếu nó không bắt buộc
  status: CourseStatus;
  lessons?: UpdateLessonRequest[]; // Thay '= []' bằng '?' nếu nó không bắt buộc
}

interface CourseFilterRequest {
  subject?: string;
  targetGrade?: string;
  categoryName?: string;
  status?: string;
  fromDate?: string | Date; // LocalDate của Java thường map thành chuỗi 'YYYY-MM-DD' hoặc đối tượng Date
  toDate?: string | Date;
  courseName?: string;
}
