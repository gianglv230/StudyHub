import { Component, OnInit } from '@angular/core';
import { ClassHeader } from '../class-management/class-header/class-header';
import { ClassDetailInfo } from './class-detail-info/class-detail-info';
import { ClassStudents } from './class-students/class-students';
import { initData } from '../../../../../utils/init-data';
import { AdminClassService } from '../../service/admin-class.service.ts/admin-class.service';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../../_shared/components/base/base-component';
import { AdminEnrollmentService } from '../../service/admin-enrollment/admin-enrollment.service';

@Component({
  selector: 'app-class-detail-management',
  imports: [ClassHeader, ClassDetailInfo, ClassStudents],
  templateUrl: './class-detail-management.html',
  styleUrl: './class-detail-management.css',
})
export class ClassDetailManagement implements OnInit {
  classSlug?: string | null;
  classInfo?: AdminClassInfoResponse;
  students?: StudentInClassResponse[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly classService: AdminClassService,
    private readonly enrollmentService: AdminEnrollmentService,
    private readonly base: BaseComponent,
  ) {}

  ngOnInit(): void {
    this.classSlug = this.route.snapshot.paramMap.get('class-slug');
    if (this.classSlug) {
      this.initClassInfo(this.classSlug);
      this.initStudenInClass(this.classSlug);
    }
  }

  initClassInfo(classSlug: string) {
    initData<AdminClassInfoResponse>(
      this.classService.getAdminClassInfo(classSlug),
      (data) => {
        // console.log('class-info-call');
        console.log(data);
        this.classInfo = data;
      },
    );
  }

  initStudenInClass(classSlug: string) {
    initData<StudentInClassResponse[]>(
      this.enrollmentService.getStudentInClass(classSlug),
      (data) => {
        console.log(data);
        this.students = data;
      },
    );
  }

  openClass() {
    if (!this.classSlug) return;
    this.classService.openClass(this.classSlug).subscribe({
      next: (res) => {
        if (res.error) {
          this.base.showDanger(res.message);
          return;
        }
        if (res.data) {
          this.base.showSuccess('Mở lớp thành công');
          this.initClassInfo(this.classSlug!);
          // this.router.navigate([
          //   `/giao-vien/lop-hoc/${this.classSlug}/quan-ly-bai-hoc/${res.data}`,
          // ]);
        }
      },
      error: (err) => this.base.handleError(err),
    });
  }

  closeClass() {
    if (!this.classSlug) return;
    this.classService.closeClass(this.classSlug).subscribe({
      next: (res) => {
        if (res.error) {
          this.base.showDanger(res.message);
          return;
        }
        if (res.data) {
          this.base.showSuccess('Đóng lớp thành công');
          this.initClassInfo(this.classSlug!);
          // this.router.navigate([
          //   `/giao-vien/lop-hoc/${this.classSlug}/quan-ly-bai-hoc/${res.data}`,
          // ]);
        }
      },
      error: (err) => this.base.handleError(err),
    });
  }
}
