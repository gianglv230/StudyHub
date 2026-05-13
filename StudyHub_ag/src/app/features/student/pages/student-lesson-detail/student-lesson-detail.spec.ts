import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLessonDetail } from './student-lesson-detail';

describe('StudentLessonDetail', () => {
  let component: StudentLessonDetail;
  let fixture: ComponentFixture<StudentLessonDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentLessonDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentLessonDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
