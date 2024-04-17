import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { SnackbarService } from '../material/services/snackbar.service';
import { NurseService } from './nurse.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-nurse',
    templateUrl: './nurse.component.html',
})
export class NurseComponent {
    chat = 'invisible';
    routes = [
        { title: 'Patient List', icon: 'patient_list', link: 'appointments' },
    ];
    userSubscription: Subscription;
    headNurseSubscription: Subscription;

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
        this.headNurseSubscription = nurseService.isHeadNurseSubject.subscribe({
            next: (isHeadNurse) => {
                if (isHeadNurse) {
                    this.routes.push({
                        title: 'Ward Queue',
                        icon: 'ward',
                        link: 'assign_ward',
                    });
                }
            },
        });
    }

    onLogout() {
        this.authService.logout();
        this.snackBarService.openSnackBar('Logged Out Successfully');
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
        this.headNurseSubscription.unsubscribe();
    }
}
