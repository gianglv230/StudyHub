interface CardContainerModel {
  title: string;
  subject: string;
  targetGrade: string;
  categoryName: string;
  thumbnail: string;
}

interface CourseOverviewInfoModel {
  subject: string;
  categoryName: string;
  targetGrade: string;
  numberOfLessons;
}

interface CourseDetailInfoModel{
    video?: string;
    description?: string;
    lessons?: LessonLiteResponse[]
}