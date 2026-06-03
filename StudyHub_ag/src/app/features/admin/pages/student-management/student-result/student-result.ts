import { Component } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

// Register all community features for AG Grid
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-student-result',
  imports: [AgGridAngular],
  templateUrl: './student-result.html',
  styleUrl: './student-result.css',
})
export class StudentResult {
  // Row Data: The data to be displayed.
  rowData = [
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    { field: 'electric' },
  ];
}
