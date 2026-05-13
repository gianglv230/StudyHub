import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDetailManagement } from './class-detail-management';

describe('ClassDetailManagement', () => {
  let component: ClassDetailManagement;
  let fixture: ComponentFixture<ClassDetailManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassDetailManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassDetailManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
