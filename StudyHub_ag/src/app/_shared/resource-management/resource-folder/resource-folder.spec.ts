import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceFolder } from './resource-folder';

describe('ResourceFolder', () => {
  let component: ResourceFolder;
  let fixture: ComponentFixture<ResourceFolder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceFolder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceFolder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
