import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Receptionist } from '../../shared/models/user';
import { AdminService } from '../admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from '../../material/services/snackbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-receptionist-dialog',
  templateUrl: './receptionist-dialog.component.html',
  styleUrl: './receptionist-dialog.component.scss'
})
export class ReceptionistDialogComponent {
  receptionistForm: FormGroup;
  getAllReceptionistSub: Subscription;
  receptionist: Receptionist[];
  receptionistLoading = true;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ReceptionistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Receptionist,
    private adminService: AdminService,
    private snackbarService: SnackbarService
  ) {
    this.receptionistForm = this.formBuilder.group({
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
      role: ['receptionist'],
      isDisable: false,
    });
  }

  onRegisterReceptionist() {
      const formData = this.receptionistForm.value;
      this.adminService
      .registerReceptionist({
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
