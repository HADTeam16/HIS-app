import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Nurse } from '../../models/user';
import { AdminService } from '../../services/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from '../../material/services/snackbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nurse-dialog',
  templateUrl: './nurse-dialog.component.html',
  styleUrl: './nurse-dialog.component.scss'
})
export class NurseDialogComponent {
  nurseForm: FormGroup;
  getAllNurseSub: Subscription;
  nurse: Nurse[];
  nurseLoading = true;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NurseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Nurse,
    private adminService: AdminService,
    private snackbarService: SnackbarService
  ) {
    this.nurseForm = this.formBuilder.group({
      id: [''],
      userName: [''],
      password: [''],
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
      email: [''],
      profilePicture: [''],
      emergencyContactName: [''],
      emergencyContactNumber: [''],
      role: [''],
      isDisable: false,
      headNurse: false,
    });
  }

  onHeadNurseChange(checked: boolean) {
    this.nurseForm.patchValue({
      headNurse: checked
    });
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
        isDisable: formData.isDisable,
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
