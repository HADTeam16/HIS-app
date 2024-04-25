import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { SnackbarService } from '../material/services/snackbar.service';
import { NurseService } from './nurse.service';
import { Subscription } from 'rxjs';
import { User } from '../shared/models/user';

@Component({
    selector: 'app-nurse',
    templateUrl: './nurse.component.html',
})
export class NurseComponent {
    user: User = new User();
    chat = 'invisible';
    routes = [
        {
            title: 'In Patient List',
            icon: 'patient_list',
            link: 'in_patient_list',
        },
        { title: 'Statistics', icon: 'monitoring', link: 'stats' },
    ];
    userSubscription: Subscription;
    headNurseSubscription: Subscription;

    constructor(
        private nurseService: NurseService,
        private authService: AuthService,
        private snackBarService: SnackbarService
    ) {
        this.authService.user.subscribe((res) => {
            if (res) this.user = res;
        });
        this.userSubscription = authService.user.subscribe({
            next: (nurse) => {
                if (nurse) this.nurseService.isHeadNurse(nurse.id);
            },
        });
        this.headNurseSubscription = nurseService.isHeadNurseSubject.subscribe({
            next: (isHeadNurse) => {
                if (
                    isHeadNurse &&
                    !this.routes.includes({
                        title: 'Ward Queue',
                        icon: 'ward',
                        link: 'ward_queue',
                    })
                ) {
                    this.routes.push({
                        title: 'Ward Queue',
                        icon: 'ward',
                        link: 'ward_queue',
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
