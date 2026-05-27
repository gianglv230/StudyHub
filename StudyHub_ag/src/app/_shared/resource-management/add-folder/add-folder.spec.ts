import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFolder } from './add-folder';

describe('AddFolder', () => {
  let component: AddFolder;
  let fixture: ComponentFixture<AddFolder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFolder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFolder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
