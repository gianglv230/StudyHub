import { Component, Input } from '@angular/core';
import { ClassLiteCard } from "../../../../../_shared/components/class-lite-card/class-lite-card";

@Component({
  selector: 'app-classes-list',
  imports: [ClassLiteCard],
  templateUrl: './classes-list.html',
  styleUrl: './classes-list.css',
})
export class ClassesList {
  @Input()
  pageData!: PageResponse<ClassLiteResponse>;

  get classes(): ClassLiteResponse[] {
    return this.pageData?.data || [];
  }
}
