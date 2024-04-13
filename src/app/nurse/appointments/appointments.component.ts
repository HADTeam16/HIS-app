import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from '../../shared/models/user';
import { Subscription } from 'rxjs';
import { SnackbarService } from '../../material/services/snackbar.service';
import { NurseService } from '../nurse.service';
import { EditDetailsDialogComponent } from './edit-details-dialog/edit-details-dialog.component';

@Component({
    selector: 'app-appointments',
    templateUrl: './appointments.component.html',
    styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent {
    getAssignedPatientsWardSub: Subscription;
    assignedPatients: Patient[] = [];

    constructor(
        private dialog: MatDialog,
        private snackbarService: SnackbarService,
        private nurseService: NurseService
    ) {}

    ngOnInit(): void {
        this.getAssignedPatients();
    }

    getAssignedPatients(): void {
        this.getAssignedPatientsWardSub = this.nurseService
            .getAssignedPatients()
            .subscribe({
                next: (patients: Patient[]) => {
                    this.assignedPatients = patients;
                },
                error: (error) => {
                    console.error(
                        'Error fetching patients who need ward:',
                        error
                    );
                },
            });
    }

    editDetails(ele: Patient) {
        const dialogRef = this.dialog.open(EditDetailsDialogComponent, {
            data: { ele },
        });

        dialogRef.afterClosed().subscribe((result) => {
            // Handle any actions after the dialog is closed, if needed
        });
    }
}
