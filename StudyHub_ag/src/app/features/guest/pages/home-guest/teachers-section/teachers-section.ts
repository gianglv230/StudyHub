import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../service/teacher/teacher.service';
import { initData } from '../../../../../../utils/init-data';

@Component({
  selector: 'app-teachers-section',
  imports: [],
  templateUrl: './teachers-section.html',
  styleUrl: './teachers-section.css',
})
export class TeachersSection implements OnInit {
  teachers: TeacherLiteResponse[] = [];

  constructor(private readonly teacherService: TeacherService) {}

  ngOnInit(): void {
    initData<TeacherLiteResponse[]>(
      this.teacherService.getTeacherList(),
      (data) => {
        this.teachers = data;
      },
    );
  }
}
