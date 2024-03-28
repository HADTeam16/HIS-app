import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../../models/user';
import { AdminService } from '../../services/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from '../../material/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-edit-doctor-details',
  templateUrl: './edit-doctor-details.component.html',
  styleUrl: './edit-doctor-details.component.scss'
})

export class EditDoctorDetailsComponent {
  editdoctorForm: FormGroup;
  isLoading = false;
  tableDataDoctor: Doctor[] = [];
  doctorId: number;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditDoctorDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { doctorId: number },
    private authService: AuthService,
    private adminService: AdminService,
    private snackbarService: SnackbarService,
  ) {
    this.doctorId = data.doctorId;
    this.fetchDoctorDetails(this.doctorId);
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
      next: (response: Doctor[]) => {
        this.tableDataDoctor = response;
      },
      error: (error: any) => {
        this.snackbarService.openSnackBar(error);
      }
    });
  }
}


