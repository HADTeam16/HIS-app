import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../material/services/snackbar.service';
import { finalize } from 'rxjs';
import { Patient } from '../../models/user';

@Component({
    selector: 'app-delete-patient-otp-dialog',
    templateUrl: './delete-patient-otp-dialog.component.html',
    styleUrl: './delete-patient-otp-dialog.component.scss',
})
export class DeletePatientOtpDialogComponent {
    patientDeleteOptForm = new FormGroup({
        otp: new FormControl<string>('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(6),
        ]),
    });
    isLoading = false;
    showOtpField = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Patient,
        public dialogRef: MatDialogRef<DeletePatientOtpDialogComponent>,
        private snackbarService: SnackbarService,
        private authService: AuthService
    ) {
        this.sendOTPForPatientDelete();
    }

    sendOTPForPatientDelete() {
        this.isLoading = true;
        this.authService
            .sendOTPforPatientDelete(this.data.id)
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                })
            )
            .subscribe({
                next: (res) => {
                    this.snackbarService.openSnackBar(res['message']);
                    if (res['message'] === 'Email Sent Successfully') {
                        this.showOtpField = true;
                    }
                },
                error: (error) => {
                    this.snackbarService.openSnackBar(error);
                },
            });
    }

    verifyOTPForPatientDeleteRequest() {
        this.isLoading = true;
        this.authService
            .verifyOTPForPatientDelete(
                this.data.id,
                this.data.email,
                this.patientDeleteOptForm.getRawValue().otp
            )
            .then(
                (res) => {
                    this.snackbarService.openSnackBar(res);
                },
                (err) => {
                    this.snackbarService.openSnackBar(err);
                }
            )
            .finally(() => {
                this.isLoading = false;
                this.dialogRef.close();
            });
    }
}
