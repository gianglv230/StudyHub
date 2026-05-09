import { Component } from '@angular/core';
import { SearchSection } from "../home-guest/search-section/search-section";
import { SearchResult } from "./search-result/search-result";

@Component({
  selector: 'app-course-search',
  imports: [SearchSection, SearchResult],
  templateUrl: './course-search.html',
  styleUrl: './course-search.css',
})
export class CourseSearch {

}
