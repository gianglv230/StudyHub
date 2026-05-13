import { Component } from '@angular/core';
import { ClassHeader } from "./class-header/class-header";
import { ClassSearchbox } from "./class-searchbox/class-searchbox";
import { ClassResult } from "./class-result/class-result";

@Component({
  selector: 'app-class-management',
  imports: [ClassHeader, ClassSearchbox, ClassResult],
  templateUrl: './class-management.html',
  styleUrl: './class-management.css',
})
export class ClassManagement {

}
