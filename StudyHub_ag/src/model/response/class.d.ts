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
