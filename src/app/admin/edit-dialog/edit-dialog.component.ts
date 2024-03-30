import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-dialog',
  template: `
    <!-- Add content specific to each tab -->
    <ng-container [ngSwitch]="tabIndex">
      <app-edit-doctor-details *ngSwitchCase="0"></app-edit-doctor-details>
      <app-receptionist-dialog *ngSwitchCase="1"></app-receptionist-dialog>
      <app-nurse-dialog *ngSwitchCase="2"></app-nurse-dialog>
    </ng-container>
  `,
})
export class EditDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { tabIndex: number, doctorId: number }) {}

  get tabIndex(): number {
    return this.data.tabIndex;
  }

  get doctorId(): number {
    return this.data.doctorId;
  }
}