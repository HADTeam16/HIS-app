import { Component } from '@angular/core';
import { Patient } from '../../models/user';
import { ReceptionistService } from '../../services/receptionist.service';
import { finalize } from 'rxjs';
import { SnackbarService } from '../../material/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { BookAppointmentDialogComponent } from './book-appointment-dialog/book-appointment-dialog.component';

@Component({
    selector: 'app-patients',
    templateUrl: './patients.component.html',
    styleUrl: './patients.component.scss',
})
export class PatientsComponent {
    isLoading = false;
    tableHeaders = ['id', 'firstName', 'lastName', 'gender'];
    headerAlias = {
        id: 'Patient ID',
        firstName: 'First name',
        lastName: 'Last name',
    };
    tableData: Patient[];

    constructor(
        private receptionistService: ReceptionistService,
        private snackbarService: SnackbarService,
        private dialog: MatDialog
    ) {
        this.isLoading = true;
        this.receptionistService
            .getAllPatients()
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                })
            )
            .subscribe({
                next: (response) => {
                    this.tableData = response;
                },
                error: (error) => {
                    this.snackbarService.openSnackBar(error);
                },
            });
    }

    bookAppointment(patient: Patient) {
        const dialogRef = this.dialog.open(BookAppointmentDialogComponent, {
            data: patient,
        });
        dialogRef.afterClosed().subscribe({
            next: (booked: boolean) => {
                if (booked) {
                    this.snackbarService.openSnackBar('Appointment booked');
                } else {
                    this.snackbarService.openSnackBar(
                        'Appointment not possible'
                    );
                }
            },
            error: (err) => {
                this.snackbarService.openSnackBar('Error : ', err);
            },
        });
    }

    getFullAddress(patient: Patient) {
        return (
            patient.addressLine1 +
            ', ' +
            patient.addressLine2 +
            ', ' +
            patient.city +
            ', ' +
            patient.state +
            ', ' +
            patient.country
        );
    }
}
