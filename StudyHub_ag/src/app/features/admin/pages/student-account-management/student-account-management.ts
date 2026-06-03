import { Component, OnInit } from '@angular/core';
import { AccountManagement } from '../../../../_shared/account-management/account-management';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-account-management',
  imports: [AccountManagement],
  templateUrl: './student-account-management.html',
  styleUrl: './student-account-management.css',
})
export class StudentAccountManagement implements OnInit {
  id?: number;
  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    const idPath = this.route.snapshot.paramMap.get('id');
    if (idPath) {
      this.id = parseInt(idPath);
    }
  }
}
