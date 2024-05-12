import { Component } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { ChangeProfilePictureDialogComponent } from './change-profile-picture-dialog/change-profile-picture-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent {
    user: User;
    constructor(private authService: AuthService, private dialog: MatDialog) {
        this.user = this.authService.user.getValue();
    }
    changeProfile() {
        const dialogRef = this.dialog.open(ChangeProfilePictureDialogComponent, {
            data: this.user,
        });
    }
}
