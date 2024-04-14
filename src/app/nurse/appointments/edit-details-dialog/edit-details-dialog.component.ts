import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Patient } from '../../../shared/models/user';
import { SnackbarService } from '../../../material/services/snackbar.service';
import { Subscription } from 'rxjs';
import { NurseService } from '../../nurse.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-edit-details-dialog',
    templateUrl: './edit-details-dialog.component.html',
    styleUrl: './edit-details-dialog.component.scss',
})
export class EditDetailsDialogComponent {
    editPatientDetailsForm: FormGroup;
    editDetails: Patient;
    editPatientDetails: Subscription;
    isLoading = false;

    constructor(
      private dialogRef: MatDialogRef<EditDetailsDialogComponent>,
      private formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private snackbarService: SnackbarService,
      private nurseService: NurseService
  ) {
      this.editPatientDetailsForm = this.formBuilder.group({
          temperature: [''],
          bloodPressure: [''],
          height: [''],
          weight: [''],
      });
      this.editDetails = data?.ele;
      console.log("Recieved - " + this.editDetails);
  }  
    
    editAssignedPatientDetails() {
        this.isLoading = true;
        
        const updatedPatientData = this.editPatientDetailsForm.value;
      
        this.nurseService.updateAssignedPatientDetails(this.editDetails.id, updatedPatientData)
          .subscribe({
            next: (response: any) => {
              console.log("Patient updated successfully:", response);
              this.isLoading = false;
              this.dialogRef.close();
            },
            error: (error: any) => {
              console.error("Error updating doctor:", error);
              this.isLoading = false;
              this.snackbarService.openSnackBar("Error updating Patient Details: " + error);
            }
          });
    } 

}
