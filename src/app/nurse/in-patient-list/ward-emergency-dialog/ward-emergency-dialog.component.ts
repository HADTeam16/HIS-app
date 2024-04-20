import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NurseService } from '../../nurse.service';
import { SnackbarService } from '../../../material/services/snackbar.service';

@Component({
    selector: 'app-ward-emergency-dialog',
    templateUrl: './ward-emergency-dialog.component.html',
})
export class WardEmergencyDialogComponent {
    constructor(
        private dialogRef: MatDialogRef<WardEmergencyDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { ward_id: number },
        private nurseService: NurseService,
        private snackbarService: SnackbarService
    ) {}

    toggleEmergency() {
        this.nurseService.toggleEmergency(this.data.ward_id).then(
            (res: string) => {
                this.snackbarService.openSnackBar(res);
                this.dialogRef.close('yes');
            },
            (err: string) => {
                this.snackbarService.openSnackBar(err);
                this.dialogRef.close();
            }
        );
    }
}
