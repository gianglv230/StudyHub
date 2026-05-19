import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-navbar-guest',
  imports: [NgbCollapseModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar-guest.html',
  styleUrl: './navbar-guest.css',
})
export class NavbarGuest {
  isMenuCollapsed = true;

  closeMenu(){
    this.isMenuCollapsed = true;
  }
}
