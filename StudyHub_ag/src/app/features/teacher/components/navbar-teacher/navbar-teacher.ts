import { Component } from '@angular/core';
import { Navbar } from '../../../../_shared/navbar/navbar';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar-teacher',
  imports: [NgbCollapseModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar-teacher.html',
  styleUrl: './navbar-teacher.css',
})
export class NavbarTeacher extends Navbar {

}
