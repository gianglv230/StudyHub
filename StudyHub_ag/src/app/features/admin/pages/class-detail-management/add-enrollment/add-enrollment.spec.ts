import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnrollment } from './add-enrollment';

describe('AddEnrollment', () => {
  let component: AddEnrollment;
  let fixture: ComponentFixture<AddEnrollment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEnrollment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEnrollment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
