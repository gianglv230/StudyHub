import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ClassHeader } from '../class-management/class-header/class-header';
import { ClassDetailInfo } from './class-detail-info/class-detail-info';
import { ClassStudents } from './class-students/class-students';
import { initData } from '../../../../../utils/init-data';
import { AdminClassService } from '../../service/admin-class/admin-class.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BaseComponent } from '../../../../_shared/components/base/base-component';
import { AdminEnrollmentService } from '../../service/admin-enrollment/admin-enrollment.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ModalService } from '../../../../_service/utils/modal.service';
import { ClassStatusModal } from './class-status-modal/class-status-modal';
import { AddEnrollment } from './add-enrollment/add-enrollment';
import { SuspendStudent } from './suspend-student/suspend-student';
import { TransferStudent } from './transfer-student/transfer-student';

@Component({
  selector: 'app-class-detail-management',
  imports: [ClassHeader, ClassDetailInfo, ClassStudents, RouterLink],
  templateUrl: './class-detail-management.html',
  styleUrl: './class-detail-management.css',
})
export class ClassDetailManagement implements OnInit {
  classSlug?: string | null;
  classInfo?: AdminClassInfoResponse;
  students?: StudentInClassResponse[];

  private readonly destroyRef = inject(DestroyRef); // Inject ở cấp class

  constructor(
    private readonly route: ActivatedRoute,
    private readonly classService: AdminClassService,
    private readonly enrollmentService: AdminEnrollmentService,
    private readonly base: BaseComponent,
    private readonly modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.classSlug = this.route.snapshot.paramMap.get('class-slug');
    if (this.classSlug) {
      this.initClassInfo(this.classSlug);
      this.initStudenInClass(this.classSlug);
    }

    // 2. Lắng nghe sự kiện refresh từ AdminClassService để reload lại class info
    this.classService.classRefresh$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.initClassInfo(this.classSlug!);
      });

    // 3. Lắng nghe sự kiện refresh từ AdminClassService để reload lại students
    this.enrollmentService.studentRefresh$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.initStudenInClass(this.classSlug!);
      });
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

  openUpdateStatusModal() {
    this.modalService.open({
      component: ClassStatusModal,
      data: {
        id: this.classInfo?.id,
        slug: this.classInfo?.slug,
        status: this.classInfo?.status,
      },
    });
  }

  openAddEnrollmentModal() {
    if (!this.classInfo) return;
    const newPrice = Math.round(
      (this.classInfo.price / this.classInfo.numberOfLessons) *
        (this.classInfo.numberOfLessons - this.classInfo.progressOfClass),
    );

    this.modalService.open({
      component: AddEnrollment,
      data: {
        classSlug: this.classSlug,
        price: newPrice,
        openingDate: this.classInfo.openingDate,
      },
    });
  }

  // Hàm này sẽ tự động chạy khi component con thực hiện .emit()
  handleStudentSuspension(student: StudentInClassResponse) {
    console.log('Dữ liệu học sinh nhận được ở cha:', student);

    // Xử lý logic gọi API đình chỉ ở đây...
    if (!this.classInfo) return;
    const newPrice = Math.round(
      (this.classInfo.price / this.classInfo.numberOfLessons) *
        (this.classInfo.numberOfLessons - this.classInfo.progressOfClass),
    );

    this.modalService.open({
      component: SuspendStudent,
      data: {
        student: student,
        price: newPrice,
      },
    });
  }

  // Hàm này sẽ tự động chạy khi component con thực hiện .emit()
  handleTransferStudent(student: StudentInClassResponse) {
    console.log('Dữ liệu học sinh nhận được ở cha:', student);

    // Xử lý logic gọi API đình chỉ ở đây...
    if (!this.classInfo) return;
    this.modalService.open({
      component: TransferStudent,
      data: {
        student: student,
        class: this.classInfo,
      },
    });
  }
}
