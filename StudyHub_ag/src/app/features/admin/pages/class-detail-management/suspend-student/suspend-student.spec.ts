import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendStudent } from './suspend-student';

describe('SuspendStudent', () => {
  let component: SuspendStudent;
  let fixture: ComponentFixture<SuspendStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuspendStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspendStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
