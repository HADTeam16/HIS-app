import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { SnackbarService } from '../material/services/snackbar.service';
import { User } from '../shared/models/user';
import { Router } from '@angular/router';

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
    ];
    user: User;
    constructor(private authService: AuthService, private snackbarService: SnackbarService, private router : Router) {
        this.user = this.authService.user.getValue();
        console.log('Profile pic - ' + this.user.profilePicture);
    }

    onLogout() {
        this.authService.logout();
        this.snackbarService.openSnackBar("Logged out successfully");
    }
}
