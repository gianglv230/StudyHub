import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarStudent } from "../components/navbar-student/navbar-student";

@Component({
  selector: 'app-layout-student',
  imports: [RouterOutlet, NavbarStudent],
  templateUrl: './layout-student.html',
  styleUrl: './layout-student.css',
})
export class LayoutStudent {

}
