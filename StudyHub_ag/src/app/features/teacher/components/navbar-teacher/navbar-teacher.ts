import { Component } from '@angular/core';
import { Navbar } from '../../../../_shared/navbar/navbar';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserDropdown } from "../../../../_shared/components/user-dropdown/user-dropdown";

@Component({
  selector: 'app-navbar-teacher',
  imports: [NgbCollapseModule, RouterLink, RouterLinkActive, UserDropdown],
  templateUrl: './navbar-teacher.html',
  styleUrl: './navbar-teacher.css',
})
export class NavbarTeacher extends Navbar {

}
