// add-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Doctor, Nurse, Receptionist } from '../../shared/models/user';

@Component({
    selector: 'app-add-dialog',
    template: `
        <!-- Add content specific to each tab -->
        <ng-container [ngSwitch]="tabIndex">
            <app-doctor-dialog *ngSwitchCase="0" (doctorSelected)="closeDialogWithData($event)"></app-doctor-dialog>
            <app-receptionist-dialog
                *ngSwitchCase="1"
            ></app-receptionist-dialog>
            <app-nurse-dialog *ngSwitchCase="2"></app-nurse-dialog>
        </ng-container>
    `,
})
export class AddDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { tabIndex: number } ,public dialogRef:MatDialogRef<AddDialogComponent>) {}

    get tabIndex(): number {
        return this.data.tabIndex;
    }

    closeDialogWithData(data:Doctor|Nurse|Receptionist) {
        this.dialogRef.close(data);
    }
}
