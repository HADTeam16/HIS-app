import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Nurse } from '../../models/user';
import { AdminService } from '../../services/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from '../../material/services/snackbar.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-edit-nurse-details',
  templateUrl: './edit-nurse-details.component.html',
  styleUrl: './edit-nurse-details.component.scss'
})
export class EditNurseDetailsComponent {
  editNurseForm: FormGroup;
  isLoading = false;
  tableDataNurse: Nurse;
  nurseId: number;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditNurseDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nurseId: number },
    private adminService: AdminService,
    private snackbarService: SnackbarService,
  ) {
    this.nurseId = data.nurseId;
    this.editNurseForm = this.formBuilder.group({
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
      profilePicture: [''],
      emergencyContactName: [''],
      emergencyContactNumber: [''],
    });
    this.fetchNurseDetails(this.nurseId);
  }

  onEditSaveNurse() {
    this.isLoading = true;
    
    const updatedNurseData = this.editNurseForm.value;
  
    this.adminService.updateNurseById(this.nurseId, updatedNurseData)
      .subscribe({
        next: (response: any) => {
          console.log("Nurse updated successfully:", response);
          this.isLoading = false;
          this.dialogRef.close();
        },
        error: (error: any) => {
          console.error("Error updating nurse:", error);
          this.isLoading = false;
          this.snackbarService.openSnackBar("Error updating doctor: " + error);
        }
      });
  }  

  private fetchNurseDetails(nurseId: number): void {
    this.isLoading = true;
    this.adminService
      .getNurseById(nurseId)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (response: Nurse) => {
          this.tableDataNurse = response;
          this.editNurseForm.patchValue({
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
            profilePicture: response.profilePicture,
            emergencyContactName: response.emergencyContactName,
            emergencyContactNumber: response.emergencyContactNumber,
          });
        },
        error: (error: any) => {
          this.snackbarService.openSnackBar(error);
        }
      });
    console.log(this.tableDataNurse);
  }
}
