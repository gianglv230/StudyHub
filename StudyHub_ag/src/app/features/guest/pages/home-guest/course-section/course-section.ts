import { Component, Input, OnInit } from '@angular/core';
import { GuestCourseService } from '../../../service/guest-course/guest-course.service';
import { initData } from '../../../../../../utils/init-data';
import { CourseLiteCard } from '../../../../../_shared/components/course-lite-card/course-lite-card';

@Component({
  selector: 'app-course-section',
  imports: [CourseLiteCard],
  templateUrl: './course-section.html',
  styleUrl: './course-section.css',
})
export class CourseSection implements OnInit {
  @Input()
  type: "HOT" | "NEW" = "HOT";

  title = "Khóa học hot";
  description = "Các khóa học đang được nhiều học viên đăng ký nhất";

  courseLiteProjections: CourseLiteProjection[] = [];

  constructor(
    private readonly courseService: GuestCourseService
  ){}

  ngOnInit(): void {
    if(this.type == 'HOT'){
      initData<CourseLiteProjection[]>(
        this.courseService.getHotCourse(),
        (data) => { this.courseLiteProjections = data}
      )
    } else {
      initData<CourseLiteProjection[]>(
        this.courseService.getNewCourse(),
        (data) => { this.courseLiteProjections = data}
      )

      this.title = "Khóa học mới";
      this.description = "Các khóa học mới của trung tâm";
    }
  }


}
