import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-section',
  imports: [],
  templateUrl: './search-section.html',
  styleUrl: './search-section.css',
})
export class SearchSection {
  constructor(private router: Router) {}

  onSearch(title: string): void {
    this.router.navigate(['/tim-kiem'], {
      queryParams: {
        title: title || '',
        page: 1,
      },
    });
  }
}
