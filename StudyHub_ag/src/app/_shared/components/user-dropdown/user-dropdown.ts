import { Component } from '@angular/core';
import { CacheService, KEY_CACHE } from '../../../_service/utils/cache.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { BaseComponent } from '../base/base-component';

@Component({
  selector: 'app-user-dropdown',
  imports: [NgbDropdownModule, RouterLink],
  templateUrl: './user-dropdown.html',
  styleUrl: './user-dropdown.css',
})
export class UserDropdown {
  constructor(
    private readonly cacheService: CacheService,
    private readonly base: BaseComponent,
  ) {}

  get fullname(): string {
    return this.cacheService.getItem(KEY_CACHE.FULLNAME) || '';
  }

  logout() {
    this.cacheService.removeItem(KEY_CACHE.ACCESS_TOKEN);
    this.cacheService.removeItem(KEY_CACHE.FULLNAME);
    this.cacheService.removeItem(KEY_CACHE.ROLE);
  }

  get accountManagementLink(): string {
    if (this.base.isStudent()) {
      return '/hoc-vien/thong-tin-ca-nhan';
    }
    if (this.base.isTeacher()) {
      return '/giao-vien/thong-tin-ca-nhan';
    }
    return '/admin/thong-tin-ca-nhan';
  }
}
