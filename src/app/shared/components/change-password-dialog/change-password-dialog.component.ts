import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../material/services/snackbar.service';
import { finalize, Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ChangePasswordRequest } from '../../models/user';

@Component({
    selector: 'app-change-password-dialog',
    templateUrl: './change-password-dialog.component.html',
    styleUrls: ['./change-password-dialog.component.scss'],
})
export class ChangePasswordDialogComponent {
    changeUserPasswordForm = new FormGroup({
        oldPassword: new FormControl<string>(''),
        newPassword: new FormControl<string>(''),
    });
    changePassword: Subscription;
    isLoading = false;

    constructor(
        private dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private snackbarService: SnackbarService,
        private authService: AuthService
    ) {}

    changeUserPassword() {
        this.isLoading = true;
        const oldPassword =
            this.changeUserPasswordForm.get('oldPassword').value;
        const newPassword =
            this.changeUserPasswordForm.get('newPassword').value;

        const changePasswordRequest: ChangePasswordRequest = {
            oldPassword,
            newPassword,
        };

        this.authService
            .changeUserPassword(changePasswordRequest)
            .then(
                (response: string) => {
                    this.snackbarService.openSnackBar(response);
                    this.dialogRef.close();
                },
                (error: string) => {
                    this.snackbarService.openSnackBar(error);
                    this.dialogRef.close();
                }
            )
            .finally(() => {
                this.isLoading = false;
            });
    }
}
