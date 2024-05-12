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
    filesUploadedFlags = [false, false, false, false, false];

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
            medicalLicenseNumber: ['', Validators.required],
            specialization: ['', Validators.required],
            medicalDegree: [''],
            cv: [''],
            drugScreeningResult: [''],
            workStart: ['', Validators.required],
            workEnd: ['', Validators.required],
        });
        this.fetchDoctorDetails(this.doctorId);
    }

    onBoardCertificationSelected(event: string) {
        console.log(event);
        this.editdoctorForm.controls['boardCertification'].setValue(event);
        this.filesUploadedFlags[1] = true;
    }

    onCVSelected(event: string) {
        this.editdoctorForm.controls['cv'].setValue(event);
        this.filesUploadedFlags[2] = true;
    }

    onMedicalDegreeSelected(event: string) {
        this.editdoctorForm.controls['medicalDegree'].setValue(event);
        this.filesUploadedFlags[3] = true;
    }

    onDrugScreeningResultSelected(event: string) {
        this.editdoctorForm.controls['drugScreeningResult'].setValue(event);
        this.filesUploadedFlags[4] = true;
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
