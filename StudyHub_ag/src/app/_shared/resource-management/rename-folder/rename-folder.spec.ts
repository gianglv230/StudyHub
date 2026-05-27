import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameFolder } from './rename-folder';

describe('RenameFolder', () => {
  let component: RenameFolder;
  let fixture: ComponentFixture<RenameFolder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenameFolder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenameFolder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
