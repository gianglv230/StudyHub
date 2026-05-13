import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDetailInfo } from './class-detail-info';

describe('ClassDetailInfo', () => {
  let component: ClassDetailInfo;
  let fixture: ComponentFixture<ClassDetailInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassDetailInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassDetailInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
