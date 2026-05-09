import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesOfCourse } from './classes-of-course';

describe('ClassesOfCourse', () => {
  let component: ClassesOfCourse;
  let fixture: ComponentFixture<ClassesOfCourse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassesOfCourse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassesOfCourse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
