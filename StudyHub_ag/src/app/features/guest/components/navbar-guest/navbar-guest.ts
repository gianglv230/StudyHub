import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Navbar } from '../../../../_shared/navbar/navbar';
import { ModalService } from '../../../../_service/utils/modal.service';
import { Login } from '../login/login';


@Component({
  selector: 'app-navbar-guest',
  imports: [NgbCollapseModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar-guest.html',
  styleUrl: './navbar-guest.css',
})
export class NavbarGuest extends Navbar {
  constructor(private readonly modalService: ModalService) {
    super();
  }

  openLoginModal() {
    this.modalService.open({
      component: Login,
      // data: user,
      // size: 'sm',
    });
  }
}
