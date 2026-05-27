import {
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ResourceSectionHeader } from './resource-section-header/resource-section-header';
import { ResourceFolder } from './resource-folder/resource-folder';
import { ResourceFiles } from './resource-files/resource-files';
import { BaseComponent } from '../components/base/base-component';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '../../_service/resource/resource.service';
import { Subscription } from 'rxjs';
import { initData } from '../../../utils/init-data';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface GroupedChildren {
  image: ChildrenResourceResponse[];
  folder: ChildrenResourceResponse[];
  video: ChildrenResourceResponse[];
  pdf: ChildrenResourceResponse[];
  doc: ChildrenResourceResponse[];
  audio: ChildrenResourceResponse[];
  raw: ChildrenResourceResponse[];
}

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

  groupedChildren: GroupedChildren = {
    image: [],
    folder: [],
    video: [],
    pdf: [],
    doc: [],
    audio: [],
    raw: [],
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly base: BaseComponent,
    private readonly resourceService: ResourceService,
  ) {}

  ngOnInit(): void {
    // 1. Lắng nghe thay đổi của URL query params
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        this.folderId = params['id'];
        this.initFolder(this.folderId);
      },
    );

    // 2. Lắng nghe sự kiện refresh từ ResourceService để reload lại folder
    this.resourceService.folderRefresh$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.initFolder(this.folderId);
      });
  }

  initFolder(folderId: string | undefined) {
    initData<FolderResourceResponse>(
      this.resourceService.getMyFolders(folderId),
      (data) => {
        this.folders = data;

        this.groupedChildren = this.groupChildren(data.children);
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

  private groupChildren(children: ChildrenResourceResponse[]): GroupedChildren {
    const grouped: GroupedChildren = {
      image: [],
      folder: [],
      video: [],
      pdf: [],
      doc: [],
      audio: [],
      raw: [],
    };

    const docExtensions = ['doc', 'docx', 'txt'];
    const audioExtensions = ['mp3', 'wav', 'ogg', 'aac'];

    children.forEach((child) => {
      switch (child.resourceType) {
        case 'image':
          grouped.image.push(child);
          break;

        case 'folder':
          grouped.folder.push(child);
          break;

        case 'video':
          grouped.video.push(child);
          break;

        case 'raw': {
          const extension = child.extension?.toLowerCase();

          if (extension === 'pdf') {
            grouped.pdf.push(child);
          } else if (docExtensions.includes(extension || '')) {
            grouped.doc.push(child);
          } else if (audioExtensions.includes(extension || '')) {
            grouped.audio.push(child);
          } else {
            grouped.raw.push(child);
          }

          break;
        }

        default:
          grouped.raw.push(child);
      }
    });

    return grouped;
  }
}
