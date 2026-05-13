import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseHeader } from './course-header';

describe('CourseHeader', () => {
  let component: CourseHeader;
  let fixture: ComponentFixture<CourseHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
