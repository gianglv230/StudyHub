import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePwd } from './change-pwd';

describe('ChangePwd', () => {
  let component: ChangePwd;
  let fixture: ComponentFixture<ChangePwd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePwd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePwd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
