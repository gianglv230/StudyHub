import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSearchbox } from './class-searchbox';

describe('ClassSearchbox', () => {
  let component: ClassSearchbox;
  let fixture: ComponentFixture<ClassSearchbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassSearchbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassSearchbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
