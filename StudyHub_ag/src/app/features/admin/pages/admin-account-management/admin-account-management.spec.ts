import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccountManagement } from './admin-account-management';

describe('AdminAccountManagement', () => {
  let component: AdminAccountManagement;
  let fixture: ComponentFixture<AdminAccountManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAccountManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAccountManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
