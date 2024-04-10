import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../material/services/snackbar.service';
import { NurseService } from '../services/nurse.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-nurse',
    templateUrl: './nurse.component.html',
    styleUrls: ['./nurse.component.css'],
})
export class NurseComponent {
    chat = 'invisible';
    routes = [
        { title: 'Appointments', icon: 'calendar_clock', link: 'appointments' },
        { title: 'Manage Appointments', icon: 'ward', link: 'assign_ward' },
    ];
    userSubscription: Subscription;

    constructor(
        private nurseService: NurseService,
        private authService: AuthService,
        private snackBarService: SnackbarService
    ) {
        this.userSubscription = authService.user.subscribe({
            next: (nurse) => {
                if (nurse) this.nurseService.isHeadNurse(nurse.id);
            },
        });
    }

    onLogout() {
        this.authService.logout();
        this.snackBarService.openSnackBar('Logged Out Successfully');
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}
