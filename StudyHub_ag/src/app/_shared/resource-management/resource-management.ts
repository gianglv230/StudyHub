import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { ResourceSectionHeader } from './resource-section-header/resource-section-header';
import { ResourceFolder } from './resource-folder/resource-folder';
import { ResourceFiles } from './resource-files/resource-files';
import { BaseComponent } from '../components/base/base-component';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '../../_service/resource/resource.service';
import { Subscription } from 'rxjs';
import { initData } from '../../../utils/init-data';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-resource-management',
  imports: [ResourceSectionHeader, ResourceFolder, ResourceFiles],
  templateUrl: './resource-management.html',
  styleUrl: './resource-management.css',
})
export class ResourceManagement implements OnInit, OnDestroy {
  protected queryParamsSubscription!: Subscription;
  private readonly destroyRef = inject(DestroyRef); // Inject ở cấp class

  folders?: FolderResourceResponse;
  folderId?: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly base: BaseComponent,
    private readonly resourceService: ResourceService,
  ) { }

  ngOnInit(): void {
    // 1. Lắng nghe thay đổi của URL query params
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        this.folderId = params['id'];
        this.initFolder(this.folderId);
      },
    );

    // 2. Lắng nghe sự kiện refresh từ ResourceService để reload lại folder
    this.resourceService.folderRefresh$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.initFolder(this.folderId);
    });
  }

  initFolder(folderId: string | undefined) {
    initData<FolderResourceResponse>(
      this.resourceService.getMyFolders(folderId),
      (data) => {
        console.log(data);
        this.folders = data;
      },
    );
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

  get foldersData(): FolderResourceResponse | undefined {
    return this.folders;
  }

  get id(): number | null {
    const id = Number(this.folderId);

    return Number.isNaN(id) ? null : id;
  }
}
