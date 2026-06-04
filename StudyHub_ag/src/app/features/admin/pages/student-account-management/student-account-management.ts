import { Component, OnInit } from '@angular/core';
import { AccountManagement } from '../../../../_shared/account-management/account-management';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-account-management',
  imports: [AccountManagement],
  templateUrl: './student-account-management.html',
  styleUrl: './student-account-management.css',
})
export class StudentAccountManagement implements OnInit {
  id?: number;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  isStudent = false;

  ngOnInit(): void {
    // Ép kiểu ép giá trị trực tiếp từ URL hiện tại của trình duyệt
    this.isStudent = this.router.url.includes('/quan-ly-hoc-vien');

    const idPath = this.route.snapshot.paramMap.get('id');
    if (idPath) {
      this.id = parseInt(idPath);
    }
  }
}
