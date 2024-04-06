import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Receptionist } from '../../models/user';
import { AdminService } from '../../services/admin.service';
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
      id: [null],
      userName: [null],
      password: [null],
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
