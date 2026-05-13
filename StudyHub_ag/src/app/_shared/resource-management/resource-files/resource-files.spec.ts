import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceFiles } from './resource-files';

describe('ResourceFiles', () => {
  let component: ResourceFiles;
  let fixture: ComponentFixture<ResourceFiles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceFiles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceFiles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
