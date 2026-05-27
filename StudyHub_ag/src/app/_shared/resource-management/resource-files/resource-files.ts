import { Component, Input } from '@angular/core';
import { ResourceCard } from "../../components/resource-card/resource-card";

@Component({
  selector: 'app-resource-files',
  imports: [ResourceCard],
  templateUrl: './resource-files.html',
  styleUrl: './resource-files.css',
})
export class ResourceFiles {
  @Input() resourceType: RESOURCE_TYPE = 'image';
  @Input() children: ChildrenResourceResponse[] = [];

  resourceHeader = {
    image: 'Hình ảnh',
    video: 'Video',
    pdf: 'PDF',
    doc: 'Tài liệu',
    audio: 'Âm thanh',
    raw: 'Tài nguyên khác',
  };

  get header(): string {
    return this.resourceHeader[this.resourceType];
  }
}
