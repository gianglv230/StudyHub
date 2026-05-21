import { TestBed } from '@angular/core/testing';

import { GuestCourse } from './guest-course';

describe('GuestCourse', () => {
  let service: GuestCourse;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestCourse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
