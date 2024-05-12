import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../../material/services/snackbar.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-change-profile-picture-dialog',
  templateUrl: './change-profile-picture-dialog.component.html',
  styleUrl: './change-profile-picture-dialog.component.scss'
})
export class ChangeProfilePictureDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ChangeProfilePictureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private snackbarService: SnackbarService,
) {}

}
