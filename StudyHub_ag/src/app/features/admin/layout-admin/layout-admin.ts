import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebar } from "../components/admin-sidebar/admin-sidebar";

@Component({
  selector: 'app-layout-admin',
  imports: [RouterOutlet, AdminSidebar],
  templateUrl: './layout-admin.html',
  styleUrl: './layout-admin.css',
  encapsulation: ViewEncapsulation.None
})
export class LayoutAdmin {

}
