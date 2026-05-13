import { Component, ViewEncapsulation } from '@angular/core';
import { NavbarTeacher } from "../components/navbar-teacher/navbar-teacher";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-teacher',
  imports: [NavbarTeacher, RouterOutlet],
  templateUrl: './layout-teacher.html',
  styleUrl: './layout-teacher.css',
  encapsulation: ViewEncapsulation.None
})
export class LayoutTeacher {

}
