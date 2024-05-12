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
})
export class ChangePasswordDialogComponent {
    changeUserPasswrodForm = new FormGroup({
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
      const oldPassword = this.changeUserPasswrodForm.get('oldPassword').value;
      const newPassword = this.changeUserPasswrodForm.get('newPassword').value;
  
      const changePasswordRequest: ChangePasswordRequest = {
          oldPassword,
          newPassword,
      };
  
      this.authService.changeUserPasswrod(changePasswordRequest)
          .subscribe(
              (response: string) => {
                  this.snackbarService.openSnackBar('Password updated successfully');
                  this.dialogRef.close();
              },
              (error: string) => {
                  console.error('Error updating password:', error);
                  this.snackbarService.openSnackBar('Error updating the password');
              }
          ).add(() => {
              this.isLoading = false;
          });
  }
}
