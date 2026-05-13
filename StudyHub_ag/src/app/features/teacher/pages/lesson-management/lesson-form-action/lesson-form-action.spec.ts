import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonFormAction } from './lesson-form-action';

describe('LessonFormAction', () => {
  let component: LessonFormAction;
  let fixture: ComponentFixture<LessonFormAction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonFormAction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonFormAction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
