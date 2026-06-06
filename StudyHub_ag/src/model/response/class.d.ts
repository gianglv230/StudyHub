interface ClassLiteResponse {
  classId: number;
  slug: string;

  teacherId: string;
  teacherName: string;

  subject: string;
  targetGrade: string;
  categoryName: string;

  className: string;

  thumbnail: string;

  openingDate: Date;
  startDate: Date;
  endDate: Date;
  classSchedule: string;
  availableSlots: number;
  price: number;
}

interface ClassDetailLiteResponse {
  classId: number;

  courseId: number;

  numberOfLessons: number;
  subject: string;
  targetGrade: string;
  categoryName: string;
  video: string;
  description: string;

  teacherId: number;
  teacherName: string;

  slug: string;
  className: string;

  openingDate: Date;
  startDate: Date;
  endDate: Date;
  classSchedule: string;

  maxStudents: number;
  availableSlots: number;

  price: number;
}

interface ClassOfTeacherResponse {
  teacherName: string;
  classes: ClassLiteResponse[];
}

interface ClassProgressResponse {
  classId: number;
  slug: string;

  teacherId: string;
  teacherName: string;

  subject: string;
  targetGrade: string;
  categoryName: string;
  numberOfLessons: number;

  className: string;

  thumbnail: string;

  openingDate: Date;
  startDate: Date;
  endDate: Date;

  status: string;
  numberOfStudent: number;
  progressOfClass: number;
}

interface ClassLessonBasicResponse {
  classLessonId: number;
  slug: string;
  lessonTitle: string;
  orderIndex: number;
  numberOfSection: number;
  // numberOfContent: number;
  createdAt: Date; // Hoặc kiểu Date nếu bạn parse thủ công
  updatedAt: Date; // Hoặc kiểu Date
}

interface ClassLessonResponse {
  classId: number;
  className: string;
  numberOfLesson: number;
  classSchedule: string;
  teacherName: string;
  thumbnail: string;
  progressOfClass: number;
  lessons: ClassLessonBasicResponse[];
}

interface AdminClassResponse {
  id: number;
  slug: string;

  courseId: number;
  courseName: string;

  teacherId: number;
  teacherName: string;

  className: string;

  thumbnailOverride: ChildrenResourceResponse;

  openingDate: Date;
  startDate: Date;
  endDate: Date;
  classSchedule: string;
  price: number;
  maxStudents: number;

  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}

type ClassStatus = 'UPCOMING' | 'ONGOING' | 'FINISHED' | 'CANCELED';

interface AdminClassInfoResponse {
  id: number;
  slug: string;

  courseId: number;
  courseName: string;

  teacherId: number;
  teacherName: string;

  className: string;
  status: ClassStatus;

  subject: string;
  targetGrade: string;
  categoryName: string;

  openingDate: Date;
  startDate: Date;
  endDate: Date;

  price: number;
  numberOfLessons: number;
  progressOfClass: number;
}

interface ClassAdminResponse {
  classId: number;
  slug: string;

  teacherId: number;
  teacherName: string;

  subject: string;
  targetGrade: string;
  categoryName: string;

  courseSlug: string;
  className: string;
  thumbnail: string;

  openingDate: Date;
  startDate: Date;
  endDate: Date;
  classSchedule: string;
  availableSlots: number;
  price: number;
  status: ClassStatus;

  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}
