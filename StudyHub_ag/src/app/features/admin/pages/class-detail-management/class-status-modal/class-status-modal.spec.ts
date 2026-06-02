import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassStatusModal } from './class-status-modal';

describe('ClassStatusModal', () => {
  let component: ClassStatusModal;
  let fixture: ComponentFixture<ClassStatusModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassStatusModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassStatusModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
