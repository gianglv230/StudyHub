import { Component, Input } from '@angular/core';
import { Empty } from '../../empty/empty';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { ResourceService } from '../../../_service/resource/resource.service';
import { BaseComponent } from '../../components/base/base-component';
import { RouterLink } from '@angular/router';
import { ModalService } from '../../../_service/utils/modal.service';
import { RenameFolder } from '../rename-folder/rename-folder';

@Component({
  selector: 'app-resource-folder',
  imports: [Empty, RouterLink, SpinnerComponent],
  templateUrl: './resource-folder.html',
  styleUrl: './resource-folder.css',
})
export class ResourceFolder {
  @Input() folders?: FolderResourceResponse;

  selected: number = -1;

  constructor(
    private readonly resourceService: ResourceService,
    private readonly base: BaseComponent,
    private readonly modalService: ModalService
  ) {}

  openOptions(index: number) {
    if (index == this.selected) {
      this.selected = -1;
      return;
    }
    this.selected = index;
  }

  deleteFolder(folder: ChildrenResourceResponse) {
    this.resourceService.deleteFolder(folder.id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.error) {
          this.base.showDanger(res.message);
          return;
        }
        if (res.data) {
          this.base.showSuccess('Đã xóa folder ' + folder.resourceName);
          this.selected = -1;
          this.resourceService.triggerRefreshFolder();
        }
      },
      error: (err) => this.base.handleError(err),
      // complete: () => (this.isSubmitting = false),
    });
  }

  openRenameModal(folder: ChildrenResourceResponse){
    this.modalService.open({
      component: RenameFolder,
      data: {
        id: folder.id,
        resourceName: folder.resourceName
      }
    })
  }
}
