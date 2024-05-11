import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../../shared/models/user';
import { AdminService } from '../admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from '../../material/services/snackbar.service';
import { AuthService } from '../../shared/services/auth.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-edit-doctor-details',
    templateUrl: './edit-doctor-details.component.html',
    styleUrls: ['./edit-doctor-details.component.scss'], // Use styleUrls instead of styleUrl
})
export class EditDoctorDetailsComponent {
    editdoctorForm: FormGroup;
    isLoading = false;
    tableDataDoctor: Doctor; // Change to Doctor instead of Doctor[] for a single doctor
    doctorId: number;

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<EditDoctorDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { doctorId: number },
        private authService: AuthService,
        private adminService: AdminService,
        private snackbarService: SnackbarService
    ) {
        this.doctorId = data.doctorId;
        this.editdoctorForm = this.formBuilder.group({
            firstName: [''],
            middleName: [''],
            lastName: [''],
            gender: [''],
            dateOfBirth: [''],
            country: [''],
            state: [''],
            city: [''],
            addressLine1: [''],
            addressLine2: [''],
            landmark: [''],
            pinCode: [''],
            contact: [''],
            emergencyContactName: [''],
            emergencyContactNumber: [''],
            medicalLicenseNumber: [''],
            specialization: [''],
            medicalDegree: [''],
            cv: [''],
            drugScreeningResult: [''],
            workStart: [''],
            workEnd: [''],
        });
        this.fetchDoctorDetails(this.doctorId);
    }

    onEditSaveDoctor() {
        this.isLoading = true;

        const updatedDoctorData = this.editdoctorForm.value;

        this.adminService
            .updateDoctorById(this.doctorId, updatedDoctorData)
            .subscribe({
                next: (response: any) => {
                    console.log('Doctor updated successfully:', response);
                    this.isLoading = false;
                    this.dialogRef.close(); // Close the dialog upon successful update
                },
                error: (error: any) => {
                    console.error('Error updating doctor:', error);
                    this.isLoading = false;
                    this.snackbarService.openSnackBar(
                        'Error updating doctor: ' + error
                    );
                },
            });
    }

    // Fetch doctor details by ID
    private fetchDoctorDetails(doctorId: number): void {
        this.isLoading = true;
        this.adminService
            .getDoctorById(doctorId)
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                })
            )
            .subscribe({
                next: (response: Doctor) => {
                    this.tableDataDoctor = response;
                    // Set form values after data is fetched
                    this.editdoctorForm.patchValue({
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
                        medicalLicenseNumber: response.medicalLicenseNumber,
                        specialization: response.specialization,
                        medicalDegree: response.medicalDegree,
                        cv: response.cv,
                        drugScreeningResult: response.drugScreeningResult,
                        workStart: response.workStart,
                        workEnd: response.workEnd,
                    });
                },
                error: (error: any) => {
                    this.snackbarService.openSnackBar(error);
                },
            });
        console.log(this.tableDataDoctor);
    }
}
