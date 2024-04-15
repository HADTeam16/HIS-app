import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../../shared/models/user';
import { AdminService } from '../admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from '../../material/services/snackbar.service';
import { Subscription } from 'rxjs';
import { UtilityService } from '../../shared/services/utility.service';

@Component({
    selector: 'app-doctor-dialog',
    templateUrl: './doctor-dialog.component.html',
    styleUrls: ['./doctor-dialog.component.scss'],
})
export class DoctorDialogComponent {
    doctorForm: FormGroup;
    getAllDoctorsSub: Subscription;
    doctors: Doctor[];
    doctorsLoading = true;
    selectedFile: File | undefined;
    base64Image: string | undefined;
    selectedFileName: string | undefined;
    fileLabelMappings = {
        profile: ['Profile picture selected', 'Select profile picture'],
        certification: [
            'Board certification selected',
            'Select board certification',
        ],
        cv: ['CV selected', 'Select CV'],
        degree: ['Medical degree selected', 'Select medical degree'],
        drugs: ['Drug screening selected', 'Select drug screening'],
    };
    filesUploadedFlags = [false, false, false, false, false];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DoctorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Doctor,
    private adminService: AdminService,
    private snackbarService: SnackbarService,
    private utilityService: UtilityService,
  ) {
    this.doctorForm = this.formBuilder.group({
      firstName: [null],
      middleName: [null],
      lastName: [null],
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
      role: ['doctor'],
      medicalLicenseNumber: [null],
      specialization: [null],
      boardCertification: [null],
      experience: [null],
      medicalDegree: [null],
      cv: [null],
      drugScreeningResult: [null],
      workStart: [null],
      workEnd: [null],
      isDisable: false,
    });
  }

    onProfilePictureSelected(event: string) {
        this.doctorForm.controls['profilePicture'].setValue(event);
        this.filesUploadedFlags[0] = true;
    }

    onBoardCertificationSelected(event: string) {
        console.log(event);
        this.doctorForm.controls['boardCertification'].setValue(event);
        this.filesUploadedFlags[1] = true;
    }

    onCVSelected(event: string) {
        this.doctorForm.controls['cv'].setValue(event);
        this.filesUploadedFlags[2] = true;
    }

    onMedicalDegreeSelected(event: string) {
        this.doctorForm.controls['medicalDegree'].setValue(event);
        this.filesUploadedFlags[3] = true;
    }

    onDrugScreeningResultSelected(event: string) {
        this.doctorForm.controls['drugScreeningResult'].setValue(event);
        this.filesUploadedFlags[4] = true;
    }

    onRegisterDoctor() {
        const formData = this.doctorForm.value;
        console.log(formData);
        this.adminService
            .registerDoctor({
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
                medicalLicenseNumber: formData.medicalLicenseNumber,
                specialization: formData.specialization,
                boardCertification: formData.boardCertification,
                medicalDegree: formData.medicalDegree,
                cv: formData.cv,
                drugScreeningResult: formData.drugScreeningResult,
                workStart: formData.workStart,
                workEnd: formData.workEnd,
                isDisable: formData.isDisable,
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
        console.log(formData);
    }
}
