import { Component, Input } from '@angular/core';
import { DynamicIcon } from "../../../../../_shared/components/dynamic-icon/dynamic-icon";
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-category-list',
  imports: [DynamicIcon, RouterLink, RouterLinkActive],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList {
  @Input()
  categories!: string[]

  @Input()
  category?: string;

  isActive(category: string){
    return this.category == category;
  }

}
