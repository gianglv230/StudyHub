import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherLessonDetail } from './teacher-lesson-detail';

describe('TeacherLessonDetail', () => {
  let component: TeacherLessonDetail;
  let fixture: ComponentFixture<TeacherLessonDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherLessonDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherLessonDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
