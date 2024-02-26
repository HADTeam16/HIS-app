import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../material/services/snackbar.service';

@Component({
    selector: 'app-receptionist',
    templateUrl: './receptionist.component.html',
    styleUrl: './receptionist.component.scss',
})
export class ReceptionistComponent {
    routes = [
        { title: 'Patients', icon: 'patient_list', link: 'patients' },
        { title: 'Add Patient', icon: 'person_add', link: 'add-patient' },
    ];

    constructor(
        private authService: AuthService,
        private snackbarService: SnackbarService
    ) {}

    onLogout() {
        this.authService.logout();
        this.snackbarService.openSnackBar('Logged out successfully');
    }
}
