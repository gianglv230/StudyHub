import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassOverviewInfo } from './class-overview-info';

describe('ClassOverviewInfo', () => {
  let component: ClassOverviewInfo;
  let fixture: ComponentFixture<ClassOverviewInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassOverviewInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassOverviewInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
