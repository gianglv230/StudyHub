import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesOfTeacher } from './classes-of-teacher';

describe('ClassesOfTeacher', () => {
  let component: ClassesOfTeacher;
  let fixture: ComponentFixture<ClassesOfTeacher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassesOfTeacher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassesOfTeacher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
