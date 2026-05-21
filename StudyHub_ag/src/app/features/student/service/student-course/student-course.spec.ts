import { TestBed } from '@angular/core/testing';

import { StudentCourse } from './student-course';

describe('StudentCourse', () => {
  let service: StudentCourse;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentCourse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
