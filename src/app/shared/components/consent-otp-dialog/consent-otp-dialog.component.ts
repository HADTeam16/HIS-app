import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../material/services/snackbar.service';
import { finalize } from 'rxjs';
import { Patient } from '../../models/user';

@Component({
    selector: 'app-consent-otp-dialog',
    templateUrl: './consent-otp-dialog.component.html',
})
export class ConsentOtpDialogComponent {
    consentOptForm = new FormGroup({
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
        public dialogRef: MatDialogRef<ConsentOtpDialogComponent>,
        private snackbarService: SnackbarService,
        private authService: AuthService
    ) {
        console.log('patient - ' + data.consent);
        this.sendOTPForConsentRequest();
    }

    sendOTPForConsentRequest() {
        this.isLoading = true;
        this.authService
            .sendOTPforConsentRequest(this.data.email)
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

    verifyOTPForChangeConsentRequest() {
        this.isLoading = true;
        console.log('User consent is now - ' + this.data.consent);
        if (this.data.consent == true) {
            this.authService
                .verifyOTPForRemoveConsentRequest(
                    this.data.email,
                    this.consentOptForm.getRawValue().otp
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
        } else {
            this.authService
                .verifyOTPForAddConsentRequest(
                    this.data.email,
                    this.consentOptForm.getRawValue().otp
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
}
