import { Component } from '@angular/core';
import { ResourceSectionHeader } from "./resource-section-header/resource-section-header";
import { ResourceFolder } from "./resource-folder/resource-folder";
import { ResourceFiles } from "./resource-files/resource-files";

@Component({
  selector: 'app-resource-management',
  imports: [ResourceSectionHeader, ResourceFolder, ResourceFiles],
  templateUrl: './resource-management.html',
  styleUrl: './resource-management.css',
})
export class ResourceManagement {

}
