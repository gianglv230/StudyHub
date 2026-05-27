import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'; // 1. Import OnChanges và SimpleChanges
import { ModalService } from '../../../_service/utils/modal.service';
import { AddFolder } from '../add-folder/add-folder';
import { RouterLink } from '@angular/router';
import { ResourceService } from '../../../_service/resource/resource.service';
import { BaseComponent } from '../../components/base/base-component';

@Component({
  selector: 'app-resource-section-header',
  imports: [RouterLink],
  templateUrl: './resource-section-header.html',
  styleUrl: './resource-section-header.css',
})
export class ResourceSectionHeader implements OnChanges {
  // 2. Kế thừa OnChanges
  @Input() id?: number | null;
  @Input() parentFolder?: FolderResourceResponse;

  breadcrumbsList: ParentResourceResponse[] = []; // 3. Biến thường chứa kết quả

  private MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
  private MAX_OTHER_SIZE = 10 * 1024 * 1024; // 10MB

  constructor(
    private readonly modalService: ModalService,
    private readonly resourceService: ResourceService,
    private readonly base: BaseComponent,
  ) {}

  // 4. Lắng nghe mỗi khi parentFolder thay đổi từ cha truyền vào
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parentFolder']) {
      this.updateBreadcrumbs();
    }
  }

  private updateBreadcrumbs(): void {
    const list: ParentResourceResponse[] = [];

    // In ra kiểm tra xem API trả về bao nhiêu cấp cha
    console.log('Dữ liệu parentFolder hiện tại từ API:', this.parentFolder);

    if (!this.parentFolder) {
      this.breadcrumbsList = list;
      return;
    }

    // 1. Thư mục hiện tại
    list.push({
      id: this.parentFolder.id,
      resourceName: this.parentFolder.resourceName,
      parent: this.parentFolder.parent,
    });

    // 2. Lặp ngược lên các cấp cha (nếu API có trả về đệ quy)
    let current = this.parentFolder.parent;
    while (current != null) {
      list.unshift(current);
      current = current.parent; // Xem biến này ở tab Console xem có bị null sớm không
    }

    this.breadcrumbsList = list;
    console.log('Mảng Breadcrumbs cuối cùng:', this.breadcrumbsList);
  }

  uploadResource(event: any) {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileType = file.type;
    if (fileType.startsWith('video/')) {
      if (file.size > this.MAX_VIDEO_SIZE) {
        this.base.showDanger('Video không được vượt quá 100MB');
        event.target.value = '';
        return;
      }
    } else {
      // Các loại khác
      if (file.size > this.MAX_OTHER_SIZE) {
        this.base.showDanger('Tài nguyên không được vượt quá 10MB');
        event.target.value = '';
        return;
      }
    }

    const payload: UploadResourceRequest = {
      file,
    };

    if (this.id !== null && this.id !== undefined) {
      payload.resourceParentId = this.id;
    }

    this.resourceService.uploadResource(payload).subscribe({
      next: (res) => {
        if (res.error) {
          this.base.showDanger(res.message);
          return;
        }
        this.base.showSuccess('Đã tải lên file thành công');
        this.resourceService.triggerRefreshFolder();
        event.target.value = ''; // Reset input
      },
      error: (err) => {
        this.base.handleError(err);
        event.target.value = '';
      },
    });
  }

  openAddFolderModal() {
    this.modalService.open({
      component: AddFolder,
      data: {
        id: this.id,
      },
    });
  }
}
