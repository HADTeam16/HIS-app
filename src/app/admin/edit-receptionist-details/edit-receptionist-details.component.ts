import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Receptionist } from '../../shared/models/user';
import { AdminService } from '../admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from '../../material/services/snackbar.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-edit-receptionist-details',
    templateUrl: './edit-receptionist-details.component.html',
    styleUrl: './edit-receptionist-details.component.scss',
})
export class EditReceptionistDetailsComponent {
    editReceptionistuForm: FormGroup;
    isLoading = false;
    tableDataReceptionist: Receptionist;
    receptionistId: number;

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<EditReceptionistDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { receptionistId: number },
        private adminService: AdminService,
        private snackbarService: SnackbarService
    ) {
        this.receptionistId = data.receptionistId;
        this.editReceptionistuForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            middleName: [''],
            lastName: ['', Validators.required],
            gender: ['', Validators.required],
            dateOfBirth: [new Date('2000-01-01'), Validators.required],
            country: ['', Validators.required],
            state: ['', Validators.required],
            city: ['', Validators.required],
            addressLine1: ['', Validators.required],
            addressLine2: [null],
            landmark: [null],
            pinCode: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
            contact: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
            emergencyContactName: ['', Validators.required],
            emergencyContactNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
        });
        this.fetchReceptionistDetails(this.receptionistId);
    }

    onEditSaveReceptionist() {
        this.isLoading = true;

        const updatedReceptionistData = this.editReceptionistuForm.value;

        this.adminService
            .updateNurseById(this.receptionistId, updatedReceptionistData)
            .subscribe({
                next: (response: any) => {
                    console.log('Receptionist updated successfully:', response);
                    this.isLoading = false;
                    this.dialogRef.close();
                },
                error: (error: any) => {
                    console.error('Error updating Receptionist:', error);
                    this.isLoading = false;
                    this.snackbarService.openSnackBar(
                        'Error updating Receptionist: ' + error
                    );
                },
            });
    }

    private fetchReceptionistDetails(receptionistId: number): void {
        this.isLoading = true;
        this.adminService
            .getReceptionistById(receptionistId)
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                })
            )
            .subscribe({
                next: (response: Receptionist) => {
                    this.tableDataReceptionist = response;
                    this.editReceptionistuForm.patchValue({
                        firstName: response.firstName,
                        middleName: response.middleName,
                        lastName: response.lastName,
                        gender: response.gender,
                        dateOfBirth: response.dateOfBirth,
                        country: response.country,
                        state: response.state,
                        city: response.city,
                        addressLine1: response.addressLine1,
                        addressLine2: response.addressLine2,
                        landmark: response.landmark,
                        pinCode: response.pinCode,
                        contact: response.contact,
                        emergencyContactName: response.emergencyContactName,
                        emergencyContactNumber: response.emergencyContactNumber,
                    });
                },
                error: (error: any) => {
                    this.snackbarService.openSnackBar(error);
                },
            });
    }
}
