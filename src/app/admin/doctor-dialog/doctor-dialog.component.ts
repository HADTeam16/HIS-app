import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../../models/user';
import { AdminService } from '../../services/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from '../../material/services/snackbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctor-dialog',
  templateUrl: './doctor-dialog.component.html',
  styleUrls: ['./doctor-dialog.component.scss']
})

export class DoctorDialogComponent {
  doctorForm: FormGroup;
  getAllDoctorsSub: Subscription;
  doctors: Doctor[];
  doctorsLoading = true;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DoctorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Doctor,
    private adminService: AdminService,
    private snackbarService: SnackbarService
  ) {
    this.doctorForm = this.formBuilder.group({
      id: [''],
      userName: [''],
      password: [''],
      firstName: [''],
      middleName: [''],
      lastName: [''],
      age: [''],
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
      email: [''],
      profilePicture: [''],
      emergencyContactName: [''],
      emergencyContactNumber: [''],
      role: [''],
      medicalLicenseNumber: [''],
      specialization: [''],
      boardCertification: [''],
      experience: [''],
      medicalDegree: [''],
      cv: [''],
      drugScreeningResult: [''],
      workStart: [''],
      workEnd: [''],
      isDisable: false,
    });
  }

  onRegisterDoctor() {
      console.log("Submitted successfully");
      const formData = this.doctorForm.value;
      this.adminService
      .registerDoctor({
        id: formData.id,
        userName: formData.userName,
        password: formData.password,
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        age: formData.age,
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
        experience: formData.experience,
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
