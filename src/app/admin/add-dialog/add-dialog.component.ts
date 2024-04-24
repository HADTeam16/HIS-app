// add-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-add-dialog',
    template: `
        <!-- Add content specific to each tab -->
        <ng-container [ngSwitch]="tabIndex">
            <app-doctor-dialog *ngSwitchCase="0"></app-doctor-dialog>
            <app-receptionist-dialog
                *ngSwitchCase="1"
            ></app-receptionist-dialog>
            <app-nurse-dialog *ngSwitchCase="2"></app-nurse-dialog>
        </ng-container>
    `,
})
export class AddDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { tabIndex: number }) {}

    get tabIndex(): number {
        return this.data.tabIndex;
    }
}
