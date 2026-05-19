import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar-student',
  imports: [NgbCollapseModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar-student.html',
  styleUrl: './navbar-student.css',
})
export class NavbarStudent {
isMenuCollapsed = true;

  closeMenu(){
    this.isMenuCollapsed = true;
  }
}
