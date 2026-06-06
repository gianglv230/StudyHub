import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { ModalService } from '../../../../../_service/utils/modal.service';
import { ResourceModal } from '../../../../../_shared/resource-modal/resource-modal';
import { Editor } from '../../../../../_shared/components/editor/editor';
import { TeacherClassLessonService } from '../../../service/teacher-class-lesson/teacher-class-lesson.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormInput } from '../../../../../_shared/components/form-input/form-input';
import { ResourceLiteCard } from '../../../../../_shared/resource-lite-card/resource-lite-card';
import { CommonModule } from '@angular/common';
import { validateRange } from '../../../../../../utils/validator/factory.validator';
import { toSlug } from '../../../../../../utils/slug.util';
import { Subscription } from 'rxjs';
import { TeacherClcService } from '../../../service/teacher-clc/teacher-clc.service';
import { BaseComponent } from '../../../../../_shared/components/base/base-component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lesson-form',
  imports: [
    Editor,
    FormInput,
    ResourceLiteCard,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './lesson-form.html',
  styleUrl: './lesson-form.css',
})
export class LessonForm implements OnChanges, OnDestroy {
  @Input() form?: FormGroup;
  @Input() classLessonResponse?: ClassLessonTeacherResponse;
  @Input() classSlug?: string | null;

  private titleSub?: Subscription;

  constructor(
    private readonly modalService: ModalService,
    private readonly classLessonService: TeacherClassLessonService,
    private readonly fb: FormBuilder,
    private readonly clcService: TeacherClcService,
    private readonly base: BaseComponent,
    private readonly router: Router,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['form'] && this.form) {
      // Hủy subscription cũ nếu có
      this.titleSub?.unsubscribe();

      // Lắng nghe khi titleOverride thay đổi -> cập nhật slug
      this.titleSub = this.form
        .get('titleOverride')
        ?.valueChanges.subscribe((value: string) => {
          const slugControl = this.form?.get('slug');
          if (slugControl) {
            slugControl.setValue(toSlug(value || ''), { emitEvent: false });
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.titleSub?.unsubscribe();
  }

  get isAdd(): boolean {
    return !this.form?.get('id')?.value;
  }

  get slugPreview(): string {
    return this.form?.get('slug')?.value || '';
  }

  getControl(group: any, name: string): FormControl {
    return group.get(name) as FormControl;
  }

  getSections(): FormGroup[] {
    return (
      ((this.form?.get('sections') as FormArray)?.controls as FormGroup[]) || []
    );
  }

  addSection() {
    if (!this.form) return;
    const sectionsArray = this.form.get('sections') as FormArray;
    const orderIndex = sectionsArray.length + 1;

    const newSection = this.fb.group({
      id: [null],
      sectionName: ['', [Validators.required, validateRange(8, 255)]],
      orderIndex: [orderIndex, [Validators.required]],
      description: [''],
      videoContentId: [null],
      videoResource: this.fb.control<ChildrenResourceResponse | null>(null),
      textContent: [null],
      type: ['VIDEO_MAIN', [Validators.required]],
      materials: this.fb.control<ChildrenResourceResponse[]>([]),
    });

    sectionsArray.push(newSection);
    this.recalculateOrderIndices();
  }

  deleteSection(secIndex: number) {
    if (!this.form) return;
    const sectionsArray = this.form.get('sections') as FormArray;
    sectionsArray.removeAt(secIndex);
    this.recalculateOrderIndices();
  }

  moveSectionUp(secIndex: number) {
    if (secIndex === 0) return;
    const sectionsArray = this.form?.get('sections') as FormArray;
    const current = sectionsArray.at(secIndex);
    sectionsArray.removeAt(secIndex);
    sectionsArray.insert(secIndex - 1, current);
    this.recalculateOrderIndices();
  }

  moveSectionDown(secIndex: number) {
    const sectionsArray = this.form?.get('sections') as FormArray;
    if (secIndex === sectionsArray.length - 1) return;
    const current = sectionsArray.at(secIndex);
    sectionsArray.removeAt(secIndex);
    sectionsArray.insert(secIndex + 1, current);
    this.recalculateOrderIndices();
  }

  recalculateOrderIndices() {
    if (!this.form) return;
    const sectionsArray = this.form.get('sections') as FormArray;

    sectionsArray.controls.forEach((secControl, secIdx) => {
      secControl.get('orderIndex')?.setValue(secIdx + 1);
    });
  }

  openResourceModal(
    section: FormGroup,
    mode: 'single' | 'multiple' = 'single',
  ) {
    this.modalService
      .open({
        component: ResourceModal,
        size: 'xl',
        data: { selectionMode: mode },
      })
      .subscribe((resources) => {
        if (resources) {
          if (mode === 'single') {
            const res = Array.isArray(resources) ? resources[0] : resources;
            section.get('videoContentId')?.setValue(res.id);
            section.get('videoResource')?.setValue(res);
          } else {
            const selectedList = Array.isArray(resources)
              ? resources
              : [resources];
            const currentMaterials = section.get('materials')?.value || [];

            const merged = [...currentMaterials];
            selectedList.forEach((item) => {
              if (!merged.some((existing) => existing.id === item.id)) {
                merged.push(item);
              }
            });
            section.get('materials')?.setValue(merged);
          }
        }
      });
  }

  removeVideoResource(section: FormGroup) {
    section.get('videoContentId')?.setValue(null);
    section.get('videoResource')?.setValue(null);
  }

  removeMaterial(section: FormGroup, materialId: number) {
    const currentMaterials = section.get('materials')?.value || [];
    const updated = currentMaterials.filter((m: any) => m.id !== materialId);
    section.get('materials')?.setValue(updated);
  }

  deleteClassLesson() {
    if (!this.classLessonResponse?.clcId) return;
    this.clcService.delete(this.classLessonResponse.clcId).subscribe({
      next: (res) => {
        if (res.error) {
          this.base.showDanger(res.message);
          return;
        }
        if (res.data) {
          this.base.showSuccess('Xóa bài học thành công');
          this.router.navigate([`/giao-vien/lop-hoc/${this.classSlug}`]);
        }
      },
      error: (err) => this.base.handleError(err),
    });
  }
}
