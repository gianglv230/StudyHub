import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ResourceService } from '../../../_service/resource/resource.service';
import { BaseComponent } from '../base/base-component';
import { finalize, map, Subscription } from 'rxjs';
import { ResourcePickerService } from '../../../_service/utils/resource-picker.service';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-resource-card',
  imports: [AsyncPipe],
  templateUrl: './resource-card.html',
  styleUrl: './resource-card.css',
})
export class ResourceCard implements OnInit, OnDestroy {
  @Input() resourceType: RESOURCE_TYPE = 'image';
  @Input() child?: ChildrenResourceResponse;

  isSelected = false;
  private isSubmitting = false;
  private MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
  private MAX_OTHER_SIZE = 10 * 1024 * 1024; // 10MB
  private classSlug?: string | null;
  private sub?: Subscription;

  constructor(
    private readonly resourceService: ResourceService,
    private readonly base: BaseComponent,
    private readonly resourcePickerService: ResourcePickerService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    this.classSlug = route.snapshot.paramMap.get('class-slug');

    // Subscribe để cập nhật trạng thái active khi selectedResources$ thay đổi
    this.sub = this.resourcePickerService.selectedResources$.subscribe(
      (selected) => {
        this.isSelected = selected.some((r) => r.id === this.child?.id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get videoThumbnail(): string | undefined {
    if (this.child?.resourceType === 'video') {
      const fileName = this.child.url!;

      // cắt extension cuối
      const lastDotIndex = fileName.lastIndexOf('.');

      if (lastDotIndex !== -1) {
        return fileName.substring(0, lastDotIndex) + '.avif';
      }

      return fileName + '.avif';
    }

    return '';
  }

  updateResource(event: any) {
    const file = event.target.files?.[0];

    if (!file || !this.child) return;

    const currentType = this.child.resourceType;
    const fileType = file.type;

    // Validate image
    if (currentType === 'image' && !fileType.startsWith('image/')) {
      this.base.showDanger('Tài nguyên hiện tại là ảnh');
      event.target.value = '';
      return;
    }

    // Validate video
    if (currentType === 'video') {
      if (!fileType.startsWith('video/')) {
        this.base.showDanger('Tài nguyên hiện tại là video');
        event.target.value = '';
        return;
      }

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
    const payload: UpdateResourceRequest = {
      id: this.child.id,
      file: file,
    };

    this.resourceService.updateFile(payload).subscribe({
      next: (res) => {
        if (res.error) {
          this.base.showDanger(res.message);
          return;
        }

        this.base.showSuccess('Đã cập nhật tài nguyên thành công');
        this.resourceService.triggerRefreshFolder();
        event.target.value = '';
      },

      error: (err) => {
        this.base.handleError(err);
        event.target.value = '';
      },
    });
  }

  deleteFile(resourceId: number) {
    this.resourceService
      .deleteFile(resourceId)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.error) {
            this.base.showDanger(res.message);
            return;
          }
          if (res.data) {
            this.base.showSuccess('Đã xóa file');
            this.resourceService.triggerRefreshFolder();
          }
        },
        error: (err) => this.base.handleError(err),
        complete: () => (this.isSubmitting = false),
      });
  }

  toggleSelect() {
    if (this.classSlug) {
      this.resourcePickerService.toggle(this.child!);
    }
  }
}
