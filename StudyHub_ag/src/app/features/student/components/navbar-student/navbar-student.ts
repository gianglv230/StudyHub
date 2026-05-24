import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Navbar } from '../../../../_shared/navbar/navbar';
import { UserDropdown } from "../../../../_shared/components/user-dropdown/user-dropdown";

@Component({
  selector: 'app-navbar-student',
  imports: [NgbCollapseModule, RouterLink, RouterLinkActive, UserDropdown],
  templateUrl: './navbar-student.html',
  styleUrl: './navbar-student.css',
})
export class NavbarStudent extends Navbar {
  // isMenuCollapsed = true;

  // closeMenu(){
  //   this.isMenuCollapsed = true;
  // }
}
