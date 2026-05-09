import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutStudent } from './layout-student';

describe('LayoutStudent', () => {
  let component: LayoutStudent;
  let fixture: ComponentFixture<LayoutStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
