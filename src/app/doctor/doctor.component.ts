import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { SnackbarService } from '../material/services/snackbar.service';
import { User } from '../shared/models/user';

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
        private snackbarService: SnackbarService
    ) {
        this.authService.user.subscribe((res) => {
            if (res) this.user = res;
        });
    }

    onLogout() {
        this.authService.logout();
        this.snackbarService.openSnackBar('Logged out successfully');
    }
}
