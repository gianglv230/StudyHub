import { Component, OnInit } from '@angular/core';
import { HeroSection } from './hero-section/hero-section';
import { SearchSection } from './search-section/search-section';
import { TeachersSection } from './teachers-section/teachers-section';
import { CourseSection } from './course-section/course-section';
import {
  CacheService,
  KEY_CACHE,
} from '../../../../_service/utils/cache.service';
import { Router } from '@angular/router';
// import { RouterOutlet } from "../../../../../../node_modules/@angular/router/router_module.d";

@Component({
  selector: 'app-home-guest',
  imports: [HeroSection, SearchSection, TeachersSection, CourseSection],
  templateUrl: './home-guest.html',
  styleUrl: './home-guest.css',
})
export class HomeGuest implements OnInit {
  constructor(
    private readonly cacheService: CacheService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.checkLoginAndRedirect();
  }

  private checkLoginAndRedirect(): void {
    const token = this.cacheService.getItem(KEY_CACHE.ACCESS_TOKEN);
    const userRole = this.cacheService.getItem(KEY_CACHE.ROLE);

    // Nếu có token và role hợp lệ, tự động điều hướng vào trang bên trong
    if (token && userRole) {
      if (userRole === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else if (userRole === 'TEACHER') {
        this.router.navigate(['/giao-vien']);
      } else if (userRole === 'STUDENT') {
        this.router.navigate(['/hoc-vien']);
      }
    }
  }
}
