import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Patient } from '../../../shared/models/user';
import { SnackbarService } from '../../../material/services/snackbar.service';
import { finalize, Subscription } from 'rxjs';
import { NurseService } from '../../nurse.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-edit-details-dialog',
    templateUrl: './edit-details-dialog.component.html',
})
export class EditDetailsDialogComponent {
    editPatientDetailsForm = new FormGroup({
        temperature: new FormControl<number>(null),
        bloodPressure: new FormControl<string>(''),
        heartRate: new FormControl<number>(null),
        weight: new FormControl<number>(null),
    });
    editDetails: Patient;
    editPatientDetails: Subscription;
    isLoading = false;

    constructor(
        private dialogRef: MatDialogRef<EditDetailsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private snackbarService: SnackbarService,
        private nurseService: NurseService
    ) {
        console.log(data);
    }

    editAssignedPatientDetails() {
        this.isLoading = true;
        this.nurseService
            .updateAssignedPatientDetails(
                this.data.ward_id,
                this.editPatientDetailsForm.getRawValue()
            )
            .then(
                (response: string) => {
                    this.snackbarService.openSnackBar(
                        'Patient data updated successfully:' + response
                    );
                    this.dialogRef.close();
                },
                (error: string) => {
                    console.error('Error updating Patient Details:', error);
                    this.snackbarService.openSnackBar(
                        'Error updating Patient Details: ' + error
                    );
                }
            )
            .finally(() => {
                this.isLoading = false;
            });
    }
}
