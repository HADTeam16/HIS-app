import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { SnackbarService } from '../material/services/snackbar.service';
import { User } from '../shared/models/user';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from '../shared/components/change-password-dialog/change-password-dialog.component';

@Component({
    selector: 'app-doctor',
    templateUrl: './doctor.component.html',
    styleUrl: './doctor.component.scss',
})
export class DoctorComponent {
    chat = 'invisible';
    routes = [
        { title: 'Appointments', icon: 'calendar_clock', link: 'appointments' },
        { title: 'Ward Map', icon: 'ward', link: 'ward_map' },
        { title: 'Statistics', icon: 'monitoring', link: 'stats' },
    ];
    user: User = new User();
    constructor(
        private authService: AuthService,
        private snackbarService: SnackbarService,
        private dialog: MatDialog
    ) {
        this.authService.user.subscribe((res) => {
            if (res) this.user = res;
        });
    }

    changeUserPassword() {
        this.dialog.open(ChangePasswordDialogComponent);
    }

    onLogout() {
        this.authService.logout();
        this.snackbarService.openSnackBar('Logged out successfully');
    }
}
