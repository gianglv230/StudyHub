import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { initData } from '../../../utils/init-data';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClassService } from '../../_service/class/class.service';
import { DynamicIcon } from '../components/dynamic-icon/dynamic-icon';
import { ClassLessonCard } from '../components/class-lesson-card/class-lesson-card';
import { BaseComponent } from '../components/base/base-component';
import { ModalService } from '../../_service/utils/modal.service';
import { AddLesson } from '../../features/teacher/pages/teacher-class-detail/add-lesson/add-lesson';
import { TeacherClcService } from '../../features/teacher/service/teacher-clc/teacher-clc.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-class-lessons',
  imports: [DynamicIcon, ClassLessonCard, RouterLink],
  templateUrl: './class-lessons.html',
  styleUrl: './class-lessons.css',
  encapsulation: ViewEncapsulation.None,
})
export class ClassLessons implements OnInit {
  data?: ClassLessonResponse;
  slug?: string;
  isStudent: boolean = true;

  private readonly destroyRef = inject(DestroyRef); // Inject ở cấp class

  constructor(
    private readonly route: ActivatedRoute,
    private readonly classService: ClassService,
    private readonly base: BaseComponent,
    private readonly modalService: ModalService,
    private readonly clcService: TeacherClcService,
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('class-slug');
    if (!slug) {
      return;
    }

    this.isStudent = this.base.isStudent();
    console.log(this.isStudent);

    this.slug = slug;
    this.initLesson(slug);

    if (!this.isStudent) {
      // 2. Lắng nghe sự kiện refresh từ AdminClassService để reload lại class info
      this.clcService.lessonRefresh$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.initLesson(this.slug!);
        });
    }
  }

  initLesson(slug: string) {
    initData<ClassLessonResponse>(
      this.classService.getClassLessonOfClass(slug),
      (data) => {
        console.log(data);
        this.data = data;
      },
    );
  }

  get progress(): number {
    if (this.data) {
      return Math.round(
        (this.data.progressOfClass / this.data.numberOfLesson) * 100,
      );
    }
    return 0;
  }

  get classLessons(): ClassLessonBasicResponse[] {
    return this.data?.lessons || [];
  }

  get attendanceLink(): string {
    return this.isStudent
      ? `/hoc-vien/lop-hoc/${this.slug}/thong-tin-diem-danh`
      : `/giao-vien/lop-hoc/${this.slug}/thong-tin-diem-danh`;
  }

  openClcModal() {
    this.modalService.open({
      component: AddLesson,
      data: {
        classSlug: this.slug,
        orderIndex: this.classLessons.length,
      },
    });
  }
}
