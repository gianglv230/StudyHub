import { Component, Input, OnInit } from '@angular/core';
import { CourseLiteCard } from '../../../../../_shared/components/course-lite-card/course-lite-card';

@Component({
  selector: 'app-search-result',
  imports: [CourseLiteCard],
  templateUrl: './search-result.html',
  styleUrl: './search-result.css',
})
export class SearchResult {
  @Input()
  pageData!: PageResponse<CourseLiteProjection>;

  get courses(): CourseLiteProjection[] {
    return this.pageData?.data || [];
  }

  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }
}
