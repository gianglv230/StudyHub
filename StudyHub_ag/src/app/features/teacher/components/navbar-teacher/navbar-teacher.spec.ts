import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTeacher } from './navbar-teacher';

describe('NavbarTeacher', () => {
  let component: NavbarTeacher;
  let fixture: ComponentFixture<NavbarTeacher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarTeacher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarTeacher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
