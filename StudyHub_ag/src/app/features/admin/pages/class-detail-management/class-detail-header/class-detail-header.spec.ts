import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDetailHeader } from './class-detail-header';

describe('ClassDetailHeader', () => {
  let component: ClassDetailHeader;
  let fixture: ComponentFixture<ClassDetailHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassDetailHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassDetailHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
