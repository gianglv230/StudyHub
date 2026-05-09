import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarGuest } from "../components/navbar-guest/navbar-guest";
import { FooterGuest } from "../components/footer-guest/footer-guest";

@Component({
  selector: 'app-layout-guest',
  imports: [RouterOutlet, NavbarGuest, FooterGuest],
  templateUrl: './layout-guest.html',
  styleUrl: './layout-guest.css',
  encapsulation: ViewEncapsulation.None
})
export class LayoutGuest {

}
