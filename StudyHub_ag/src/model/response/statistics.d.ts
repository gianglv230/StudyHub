interface StatisticsBasicResponse {
  numberOfStudent: number;
  numberOfTeacher: number;
  numberOfCourses: number;
  numberOfClasses: number;
  numberOfPresent: number;
  numberOfAbsent: number;
  revenueYears: number[];
}

interface RevenueStatisticsResponse {
  month: number;
  revenue: number;
}
