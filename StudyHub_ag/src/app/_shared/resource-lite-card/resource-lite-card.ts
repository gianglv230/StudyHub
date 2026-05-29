import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-resource-lite-card',
  imports: [],
  templateUrl: './resource-lite-card.html',
  styleUrl: './resource-lite-card.css',
})
export class ResourceLiteCard {
  @Input() child?: ChildrenResourceResponse;
  @Output() onUpdate = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();

  get resourceType(){
    return this.child?.resourceType;
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

  updateResource(id: number){
    this.onUpdate.emit(id);
  }

  deleteFile(id: number){
    this.onDelete.emit(id);
  }
}
