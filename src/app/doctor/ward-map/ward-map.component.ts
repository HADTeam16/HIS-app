import { Component, HostBinding, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WardDetailDialogComponent } from './ward-detail-dialog/ward-detail-dialog.component';

@Component({
    selector: 'app-ward-map',
    templateUrl: './ward-map.component.html',
    styleUrl: './ward-map.component.css',
})
export class WardMapComponent {
    wards = {
        1: [
            { ward_id: 1, available: false, patient_id: 1 },
            { ward_id: 2, available: true, patient_id: 0 },
            { ward_id: 3, available: false, patient_id: 2 },
            { ward_id: 4, available: false, patient_id: 3 },
            { ward_id: 5, available: false, patient_id: 4 },
            { ward_id: 6, available: true, patient_id: 0 },
            { ward_id: 7, available: false, patient_id: 5 },
            { ward_id: 8, available: true, patient_id: 0 },
            { ward_id: 9, available: true, patient_id: 0 },
            { ward_id: 10, available: false, patient_id: 6 },
        ],
        2: [
            { ward_id: 11, available: false, patient_id: 11 },
            { ward_id: 12, available: true, patient_id: 0 },
            { ward_id: 13, available: false, patient_id: 21 },
            { ward_id: 14, available: false, patient_id: 31 },
            { ward_id: 15, available: false, patient_id: 41 },
            { ward_id: 16, available: true, patient_id: 0 },
            { ward_id: 17, available: false, patient_id: 51 },
            { ward_id: 18, available: true, patient_id: 0 },
        ],
        3: [
            { ward_id: 19, available: false, patient_id: 17 },
            { ward_id: 20, available: true, patient_id: 0 },
            { ward_id: 21, available: false, patient_id: 12 },
            { ward_id: 22, available: false, patient_id: 13 },
            { ward_id: 23, available: false, patient_id: 14 },
            { ward_id: 24, available: true, patient_id: 0 },
        ],
    };
    selectedFloorWards = this.wards[1];

    constructor(private dialog: MatDialog) {}

    getFloors(wardsObj: any): Array<number> {
        return Object.keys(wardsObj).map(Number);
    }

    onFloorChange(floor: number): void {
        this.selectedFloorWards = this.wards[floor];
    }

    openDialog(wardData: any): void {
        this.dialog.open(WardDetailDialogComponent, {
            height: '60%',
            width: '60%',
            data: wardData,
        });
    }
}
