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
  video?: string | null | undefined;
  description?: string;
  lessons?: LessonLiteResponse[];
}
