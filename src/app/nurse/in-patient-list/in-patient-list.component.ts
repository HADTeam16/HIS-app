import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../shared/models/user';
import { Subscription } from 'rxjs';
import { SnackbarService } from '../../material/services/snackbar.service';
import { NurseService } from '../nurse.service';
import { EditDetailsDialogComponent } from './edit-details-dialog/edit-details-dialog.component';
import { AuthService } from '../../shared/services/auth.service';
import { Ward } from '../../shared/models/ward';

@Component({
    selector: 'app-in-patient-list',
    templateUrl: './in-patient-list.component.html',
})
export class InPatientListComponent {
    nurse: User;
    allotedWards: Ward[] = [];
    userSub: Subscription;

    constructor(
        private dialog: MatDialog,
        private nurseService: NurseService,
        private authService: AuthService,
        private snackbarService: SnackbarService
    ) {}

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe({
            next: (user) => {
                this.nurse = user;
                this.getAllotedWards();
            },
        });
    }

    getAllotedWards() {
        this.nurseService.getAllottedWards(this.nurse.id).then(
            (value: Ward[]) => {
                this.allotedWards = value;
                this.snackbarService.openSnackBar('In-patient list loaded');
            },
            (error: string) => {
                this.snackbarService.openSnackBar(error);
            }
        );
    }

    editDetails(ward_id: number) {
        this.dialog.open(EditDetailsDialogComponent, {
            data: { ward_id },
        });
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}
