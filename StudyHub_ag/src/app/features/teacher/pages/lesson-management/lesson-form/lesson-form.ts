import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ModalService } from '../../../../../_service/utils/modal.service';
import { ResourceModal } from '../../../../../_shared/resource-modal/resource-modal';
import { Editor } from '../../../../../_shared/components/editor/editor';
import { TeacherClassLessonService } from '../../../service/teacher-class-lesson/teacher-class-lesson.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInput } from '../../../../../_shared/components/form-input/form-input';
import { ResourceLiteCard } from '../../../../../_shared/resource-lite-card/resource-lite-card';
import { CommonModule } from '@angular/common';
import { validateRange } from '../../../../../../utils/validator/factory.validator';
import { toSlug } from '../../../../../../utils/slug.util';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lesson-form',
  imports: [
    Editor,
    FormInput,
    ResourceLiteCard,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './lesson-form.html',
  styleUrl: './lesson-form.css',
})
export class LessonForm implements OnChanges, OnDestroy {
  @Input() form?: FormGroup;
  @Input() classLessonResponse?: ClassLessonTeacherResponse;

  private titleSub?: Subscription;

  constructor(
    private readonly modalService: ModalService,
    private readonly classLessonService: TeacherClassLessonService,
    private readonly fb: FormBuilder,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['form'] && this.form) {
      // Hủy subscription cũ nếu có
      this.titleSub?.unsubscribe();

      // Lắng nghe khi titleOverride thay đổi -> cập nhật slug
      this.titleSub = this.form.get('titleOverride')?.valueChanges.subscribe((value: string) => {
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
    return (this.form?.get('sections') as FormArray)?.controls as FormGroup[] || [];
  }

  getContents(section: FormGroup): FormGroup[] {
    return (section.get('contents') as FormArray)?.controls as FormGroup[] || [];
  }

  addSection() {
    if (!this.form) return;
    const sectionsArray = this.form.get('sections') as FormArray;
    const orderIndex = sectionsArray.length + 1;

    const newSection = this.fb.group({
      id: [null],
      sectionName: ['', [Validators.required, validateRange(8, 255)]],
      orderIndex: [orderIndex, [Validators.required]],
      contents: this.fb.array([
        this.fb.group({
          id: [null],
          contentName: ['', [Validators.required, validateRange(8, 255)]],
          description: [''],
          videoContentId: [null],
          videoResource: this.fb.control<ChildrenResourceResponse | null>(null),
          textContent: [null],
          orderIndex: [1, [Validators.required]],
          type: ['VIDEO_MAIN', [Validators.required]],
          materials: this.fb.control<ChildrenResourceResponse[]>([]),
        }),
      ]),
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

  addContent(section: FormGroup) {
    const contentsArray = section.get('contents') as FormArray;
    const orderIndex = contentsArray.length + 1;

    const newContent = this.fb.group({
      id: [null],
      contentName: ['', [Validators.required, validateRange(8, 255)]],
      description: [''],
      videoContentId: [null],
      videoResource: this.fb.control<ChildrenResourceResponse | null>(null),
      textContent: [null],
      orderIndex: [orderIndex, [Validators.required]],
      type: ['VIDEO_MAIN', [Validators.required]],
      materials: this.fb.control<ChildrenResourceResponse[]>([]),
    });

    contentsArray.push(newContent);
    this.recalculateOrderIndices();
  }

  deleteContent(section: FormGroup, contIndex: number) {
    const contentsArray = section.get('contents') as FormArray;
    contentsArray.removeAt(contIndex);
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

  moveContentUp(section: FormGroup, contIndex: number) {
    if (contIndex === 0) return;
    const contentsArray = section.get('contents') as FormArray;
    const current = contentsArray.at(contIndex);
    contentsArray.removeAt(contIndex);
    contentsArray.insert(contIndex - 1, current);
    this.recalculateOrderIndices();
  }

  moveContentDown(section: FormGroup, contIndex: number) {
    const contentsArray = section.get('contents') as FormArray;
    if (contIndex === contentsArray.length - 1) return;
    const current = contentsArray.at(contIndex);
    contentsArray.removeAt(contIndex);
    contentsArray.insert(contIndex + 1, current);
    this.recalculateOrderIndices();
  }

  recalculateOrderIndices() {
    if (!this.form) return;
    const sectionsArray = this.form.get('sections') as FormArray;

    sectionsArray.controls.forEach((secControl, secIdx) => {
      secControl.get('orderIndex')?.setValue(secIdx + 1);

      const contentsArray = secControl.get('contents') as FormArray;
      contentsArray.controls.forEach((contControl, contIdx) => {
        contControl.get('orderIndex')?.setValue(contIdx + 1);
      });
    });
  }

  openResourceModal(content: FormGroup, mode: 'single' | 'multiple' = 'single') {
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
            content.get('videoContentId')?.setValue(res.id);
            content.get('videoResource')?.setValue(res);
          } else {
            const selectedList = Array.isArray(resources) ? resources : [resources];
            const currentMaterials = content.get('materials')?.value || [];

            const merged = [...currentMaterials];
            selectedList.forEach((item) => {
              if (!merged.some((existing) => existing.id === item.id)) {
                merged.push(item);
              }
            });
            content.get('materials')?.setValue(merged);
          }
        }
      });
  }

  removeVideoResource(content: FormGroup) {
    content.get('videoContentId')?.setValue(null);
    content.get('videoResource')?.setValue(null);
  }

  removeMaterial(content: FormGroup, materialId: number) {
    const currentMaterials = content.get('materials')?.value || [];
    const updated = currentMaterials.filter((m: any) => m.id !== materialId);
    content.get('materials')?.setValue(updated);
  }
}
