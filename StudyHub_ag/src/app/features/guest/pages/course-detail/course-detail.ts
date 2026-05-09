import { Component } from '@angular/core';
import { CourseOverviewInfo } from "../../../../_shared/course-overview-info/course-overview-info";
import { CourseDetailInfo } from '../../../../_shared/course-detail-info/course-detail-info';
import { ClassesOfCourse } from "../../../../_shared/classes-of-course/classes-of-course";

@Component({
  selector: 'app-course-detail',
  imports: [CourseOverviewInfo, CourseDetailInfo, ClassesOfCourse],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css',
})
export class CourseDetail {

}
