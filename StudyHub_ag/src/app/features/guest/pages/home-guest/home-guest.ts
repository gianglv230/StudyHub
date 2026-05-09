import { Component } from '@angular/core';
import { HeroSection } from "./hero-section/hero-section";
import { SearchSection } from "./search-section/search-section";
import { TeachersSection } from "./teachers-section/teachers-section";
import { CourseSection } from "./course-section/course-section";
// import { RouterOutlet } from "../../../../../../node_modules/@angular/router/router_module.d";

@Component({
  selector: 'app-home-guest',
  imports: [HeroSection, SearchSection, TeachersSection, CourseSection],
  templateUrl: './home-guest.html',
  styleUrl: './home-guest.css',
})
export class HomeGuest {

}
