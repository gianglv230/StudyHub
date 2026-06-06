import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DynamicIcon } from '../../components/dynamic-icon/dynamic-icon';
import {
  NgbAccordionDirective,
  NgbAccordionItem,
  NgbAccordionHeader,
  NgbAccordionCollapse,
  NgbAccordionButton,
  NgbAccordionBody,
  NgbSlide,
} from '@ng-bootstrap/ng-bootstrap';
import { TeacherClassLessonService } from '../../../features/teacher/service/teacher-class-lesson/teacher-class-lesson.service';

@Component({
  selector: 'app-lesson-list',
  imports: [
    DynamicIcon,
    NgbAccordionDirective,
    NgbAccordionItem,
    NgbAccordionHeader,
    NgbAccordionCollapse,
    NgbAccordionButton,
    NgbAccordionBody,
  ],
  templateUrl: './lesson-list.html',
  styleUrl: './lesson-list.css',
})
export class LessonList implements AfterViewInit {
  @Input() classLessonTeacher?: ClassLessonTeacherResponse;

  @ViewChild('accordion')
  accordion!: NgbAccordionDirective;

  // Inject service (Cách viết gọn của Angular mới)
  private lessonService = inject(TeacherClassLessonService);
  // currentSelectedSectionId: number | null = null;

  // ngOnInit(): void {
  //   // Lắng nghe sự kiện mỗi khi có section được click
  //   this.lessonService.selectedSection$.subscribe((section) => {
  //     if(!this.classLessonTeacher) return;
  //     if (section) {
  //       this.currentSelectedSectionId = section.id;
  //     } else if (this.classLessonTeacher?.sections?.length > 0) {
  //       // Nếu chưa chọn gì, mặc định hiển thị phần tử đầu tiên
  //       this.currentSelectedSectionId = this.classLessonTeacher.sections[0].id;
  //     }
  //   });
  // }

  // Hàm xử lý khi click vào item trên menu
  onSectionClick(section: SectionTeacherResponse): void {
    this.lessonService.selectSection(section);
  }

  ngAfterViewInit(): void {
    this.accordion.expandAll();
  }
}
