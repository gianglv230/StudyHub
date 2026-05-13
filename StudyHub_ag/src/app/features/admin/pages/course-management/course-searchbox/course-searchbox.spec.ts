import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSearchbox } from './course-searchbox';

describe('CourseSearchbox', () => {
  let component: CourseSearchbox;
  let fixture: ComponentFixture<CourseSearchbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseSearchbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseSearchbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
