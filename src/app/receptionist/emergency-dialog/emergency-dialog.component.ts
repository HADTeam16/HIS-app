import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-emergency-dialog',
    templateUrl: './emergency-dialog.component.html',
})
export class EmergencyDialogComponent {
    emergencyDoctors = [
        'Dr. Abhinav Dhoka',
        'Dr. Rishabh Teli',
        'Dr. Shashank Mittra',
        'Dr. Shivam Jaiswal',
    ];
    constructor(public dialogRef: MatDialogRef<EmergencyDialogComponent>) {}
    onCallEmergency() {
        this.dialogRef.close('Emergency called!');
    }
}
