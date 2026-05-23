import { Component, OnInit } from '@angular/core';
import { StudentClassService } from '../../service/student-class/student-class.service';
import { initData } from '../../../../../utils/init-data';

@Component({
  selector: 'app-home-student',
  imports: [],
  templateUrl: './home-student.html',
  styleUrl: './home-student.css',
})
export class HomeStudent implements OnInit {
  classes?: ClassProgressResponse[];

  constructor(private readonly classService: StudentClassService) {}

  ngOnInit(): void {
    initData<ClassProgressResponse[]>(
      this.classService.getMyStudentClass(),
      (data) => {
        console.log(data);
        this.classes = data;
      },
    );
  }
}
