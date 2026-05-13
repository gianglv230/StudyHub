import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonManagement } from './lesson-management';

describe('LessonManagement', () => {
  let component: LessonManagement;
  let fixture: ComponentFixture<LessonManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
