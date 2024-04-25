import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { SnackbarService } from '../material/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { EmergencyDialogComponent } from './emergency-dialog/emergency-dialog.component';

@Component({
    selector: 'app-receptionist',
    templateUrl: './receptionist.component.html',
    styleUrl: './receptionist.component.scss',
})
export class ReceptionistComponent {
    emergency = false;
    routes = [
        { title: 'Patients', icon: 'patient_list', link: 'patients' },
        { title: 'Add Patient', icon: 'person_add', link: 'add-patient' },
        { title: 'Statistics', icon: 'monitoring', link: 'stats' },
    ];

    constructor(
        private authService: AuthService,
        private snackbarService: SnackbarService,
        private dialog: MatDialog
    ) {}

    callEmergency() {
        this.emergency = true;
        this.dialog
            .open(EmergencyDialogComponent, { height: '80%', width: '60%' })
            .afterClosed()
            .subscribe({
                next: (response) => {
                    this.emergency = false;
                    if (response) {
                        this.snackbarService.openSnackBar(response);
                    }
                },
            });
    }

    onLogout() {
        this.authService.logout();
        this.snackbarService.openSnackBar('Logged out successfully');
    }
}
