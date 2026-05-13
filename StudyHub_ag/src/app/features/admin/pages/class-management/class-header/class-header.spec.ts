import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassHeader } from './class-header';

describe('ClassHeader', () => {
  let component: ClassHeader;
  let fixture: ComponentFixture<ClassHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
