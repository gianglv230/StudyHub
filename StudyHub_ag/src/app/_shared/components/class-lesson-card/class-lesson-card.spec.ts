import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassLessonCard } from './class-lesson-card';

describe('ClassLessonCard', () => {
  let component: ClassLessonCard;
  let fixture: ComponentFixture<ClassLessonCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassLessonCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassLessonCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
