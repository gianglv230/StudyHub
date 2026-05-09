import { Component } from '@angular/core';
import { CourseOverviewInfo } from "../../../../_shared/course-overview-info/course-overview-info";
import { ClassOverviewInfo } from "../../../../_shared/class-overview-info/class-overview-info";
import { CourseDetailInfo } from "../../../../_shared/course-detail-info/course-detail-info";

@Component({
  selector: 'app-class-detail',
  imports: [CourseOverviewInfo, ClassOverviewInfo, CourseDetailInfo],
  templateUrl: './class-detail.html',
  styleUrl: './class-detail.css',
})
export class ClassDetail {

}
