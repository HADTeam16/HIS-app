import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../shared/models/user';
import { Subscription } from 'rxjs';
import { SnackbarService } from '../../material/services/snackbar.service';
import { NurseService } from '../nurse.service';
import { EditDetailsDialogComponent } from './edit-details-dialog/edit-details-dialog.component';
import { AuthService } from '../../shared/services/auth.service';
import { Ward } from '../../shared/models/ward';
import { WardEmergencyDialogComponent } from './ward-emergency-dialog/ward-emergency-dialog.component';
import { PatientHistoryDialogComponent } from '../../doctor/appointments/patient-history-dialog/patient-history-dialog.component';

@Component({
    selector: 'app-in-patient-list',
    templateUrl: './in-patient-list.component.html',
    styleUrl: './in-patient-list.component.scss',
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

    toggleEmergency(ward_id: number, emergency_status: boolean) {
        this.dialog
            .open(WardEmergencyDialogComponent, {
                data: { ward_id, emergency_status },
            })
            .afterClosed()
            .subscribe((res) => {
                if (res == 'yes') {
                    const i = this.allotedWards.findIndex(
                        (el) => el.wardId == ward_id
                    );
                    this.allotedWards[i].emergency =
                        !this.allotedWards[i].emergency;
                }
            });
    }

    editDetails(ward_id: number) {
        this.dialog.open(EditDetailsDialogComponent, {
            data: { ward_id },
        });
    }

    viewHistory(patientId: number) {
        this.dialog.open(PatientHistoryDialogComponent, {
            height: '80%',
            width: '80%',
            data: { patientId, date: new Date() },
        });
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}
