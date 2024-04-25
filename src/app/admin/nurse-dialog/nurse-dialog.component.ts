import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Nurse } from '../../shared/models/user';
import { AdminService } from '../admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from '../../material/services/snackbar.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-nurse-dialog',
    templateUrl: './nurse-dialog.component.html',
    styleUrl: './nurse-dialog.component.scss',
})
export class NurseDialogComponent {
    nurseForm: FormGroup;
    getAllNurseSub: Subscription;
    nurse: Nurse[];
    nurseLoading = true;
    selectedFile: File | undefined;
    base64Image: string | undefined;
    selectedFileName: string | undefined;
    fileLabelMappings = {
        profile: ['Profile picture selected', 'Select profile picture'],
    };
    filesUploadedFlags = [false, false, false, false, false];

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<NurseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Nurse,
        private adminService: AdminService,
        private snackbarService: SnackbarService
    ) {
        this.nurseForm = this.formBuilder.group({
            firstName: [null],
            middleName: [null],
            lastName: [null],
            age: [null],
            gender: [null],
            dateOfBirth: [null],
            country: [null],
            state: [null],
            city: [null],
            addressLine1: [null],
            addressLine2: [null],
            landmark: [null],
            pinCode: [null],
            contact: [null],
            email: [null],
            profilePicture: [null],
            emergencyContactName: [null],
            emergencyContactNumber: [null],
            role: ['nurse'],
            disable: false,
            headNurse: false,
        });
    }

    onHeadNurseChange(checked: boolean) {
        this.nurseForm.patchValue({
            headNurse: checked,
        });
    }

    onProfilePictureSelected(event: string) {
        this.nurseForm.controls['profilePicture'].setValue(event);
        this.filesUploadedFlags[0] = true;
    }

    onRegisterNurse() {
        const formData = this.nurseForm.value;
        this.adminService
            .registerNurse({
                id: formData.id,
                userName: formData.userName,
                password: formData.password,
                firstName: formData.firstName,
                middleName: formData.middleName,
                lastName: formData.lastName,
                gender: formData.gender,
                dateOfBirth: formData.dateOfBirth,
                country: formData.country,
                state: formData.state,
                city: formData.city,
                addressLine1: formData.addressLine1,
                addressLine2: formData.addressLine2,
                landmark: formData.landmark,
                pinCode: formData.pinCode,
                contact: formData.contact,
                email: formData.email,
                profilePicture: formData.profilePicture,
                emergencyContactName: formData.emergencyContactName,
                emergencyContactNumber: formData.emergencyContactNumber,
                role: formData.role,
                disable: formData.disable,
                headNurse: formData.headNurse,
            })
            .subscribe({
                next: (response: string) => {
                    this.snackbarService.openSnackBar(response);
                    this.dialogRef.close(true);
                },
                error: (err) => {
                    this.snackbarService.openSnackBar(err);
                    this.dialogRef.close(false);
                },
            });
    }
}
