import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-ward-detail-dialog',
    templateUrl: './ward-detail-dialog.component.html',
    styleUrl: './ward-detail-dialog.component.css',
})
export class WardDetailDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public ward: { ward_id: number; patient_id: number; available: boolean }
    ) {}
}
