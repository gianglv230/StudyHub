interface CourseLiteProjection {
  courseId: number;
  slug: string;
  title: string;
  numberOfLessons: number;
  subject: string;
  targetGrade: string;
  categoryName: string;
  thumbnail: string;
}

// interface CourseLiteResponse {
//     courseId: number;
//     slug: string;
//     title: string;
//     numberOfLessons: number;
//     subject: string;
//     targetGrade: string;
//     categoryName: string;
//     thumbnail: string;
// }

interface CourseFilterOptionsResponse {
  subjects: string[];
  targetGrades: string[];
  categories: string[];
}

interface CourseDetailLiteResponse {
  courseId: number;
  slug: string;
  title: string;
  numberOfLessons;
  subject: string;
  targetGrade: string;
  categoryName: string;
  video?: string;
  description?: string;
  lessons?: LessonLiteResponse[];
}

interface AdminLessonResponse {
  id: number;
  title: string;
  orderIndex: number;
}

interface AdminCourseResponse {
  id: number;
  slug: string;
  title: string;
  description: string;
  subject: string;
  targetGrade: string;
  categoryName: string;
  thumbnail?: ChildrenResourceResponse;
  videoDemo?: ChildrenResourceResponse;
  numberOfLessons: number;
  status: CourseStatus;
  lessons: AdminLessonResponse[];
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
}
