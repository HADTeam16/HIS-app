import { Component, Inject } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../material/services/snackbar.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-forget-password-dialog',
    templateUrl: './forget-password-dialog.component.html',
})
export class ForgetPasswordComponent {
    forgetPasswordDetailsForm = new FormGroup({
        email: new FormControl<string>('', [
            Validators.required,
            Validators.email,
        ]),
        otp: new FormControl<string>('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(6),
        ]),
    });
    isLoading = false;
    showOtpField = false;

    constructor(
        public dialogRef: MatDialogRef<ForgetPasswordComponent>,
        private snackbarService: SnackbarService,
        private authService: AuthService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    sendOTPForForgetPasswordRequest() {
        this.isLoading = true;
        this.authService
            .sendOTPForForgetPasswordRequest(
                this.forgetPasswordDetailsForm.getRawValue().email
            )
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

    verifyOTPForForgetPasswordRequest() {
        this.isLoading = true;
        this.authService
            .verifyOTPForForgetPasswordRequest(
                this.forgetPasswordDetailsForm.getRawValue().email,
                this.forgetPasswordDetailsForm.getRawValue().otp
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
