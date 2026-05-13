import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseResult } from './course-result';

describe('CourseResult', () => {
  let component: CourseResult;
  let fixture: ComponentFixture<CourseResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseResult);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
