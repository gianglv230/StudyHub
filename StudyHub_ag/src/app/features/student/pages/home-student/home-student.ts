import { Component, OnInit } from '@angular/core';
import { StudentClassService } from '../../service/student-class/student-class.service';
import { initData } from '../../../../../utils/init-data';
import { ClassList } from "../../../../_shared/class-list/class-list";

@Component({
  selector: 'app-home-student',
  imports: [ClassList],
  templateUrl: './home-student.html',
  styleUrl: './home-student.css',
})
export class HomeStudent implements OnInit {
  upcomingClasses: ClassProgressResponse[] = [];
  ongoingClasses: ClassProgressResponse[] = [];
  finishedClasses: ClassProgressResponse[] = [];

  constructor(private readonly classService: StudentClassService) {}

  ngOnInit(): void {
    initData<ClassProgressResponse[]>(
      this.classService.getMyStudentClass(),
      (data) => {
        console.log(data);

        this.upcomingClasses = data.filter(
          (item) => item.status === 'UPCOMING'
        );

        this.ongoingClasses = data.filter(
          (item) => item.status === 'ONGOING'
        );

        this.finishedClasses = data.filter(
          (item) => item.status === 'FINISHED'
        );
      }
    );
  }
}
