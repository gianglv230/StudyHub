import { Component, Input } from '@angular/core';
import { ClassLiteCard } from "../../../../../_shared/components/class-lite-card/class-lite-card";
import { Empty } from "../../../../../_shared/empty/empty";

@Component({
  selector: 'app-classes-list',
  imports: [ClassLiteCard, Empty],
  templateUrl: './classes-list.html',
  styleUrl: './classes-list.css',
})
export class ClassesList {

  @Input()
  pageData?: PageResponse<ClassLiteResponse>;

  @Input()
  classesData?: ClassLiteResponse[];

  get classes(): ClassLiteResponse[] {
    if (this.classesData) {
      return this.classesData;
    }

    return this.pageData?.data || [];
  }
}
