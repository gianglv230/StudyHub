import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterStudent } from './footer-student';

describe('FooterStudent', () => {
  let component: FooterStudent;
  let fixture: ComponentFixture<FooterStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
