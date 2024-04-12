import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { SnackbarService } from '../material/services/snackbar.service';

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

    constructor(private authService:AuthService,private snackbarService:SnackbarService) {}

    onLogout() {
        this.authService.logout();
        this.snackbarService.openSnackBar("Logged out successfully");
    }
}
