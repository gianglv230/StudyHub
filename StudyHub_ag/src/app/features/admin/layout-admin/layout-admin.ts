import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebar } from "../components/admin-sidebar/admin-sidebar";
import { UserDropdown } from "../../../_shared/components/user-dropdown/user-dropdown";

@Component({
  selector: 'app-layout-admin',
  imports: [RouterOutlet, AdminSidebar, UserDropdown],
  templateUrl: './layout-admin.html',
  styleUrl: './layout-admin.css',
  encapsulation: ViewEncapsulation.None
})
export class LayoutAdmin {

}
