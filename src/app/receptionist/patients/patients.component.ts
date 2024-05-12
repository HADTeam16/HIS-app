import { Component } from '@angular/core';
import { Patient } from '../../shared/models/user';
import { ReceptionistService } from '../receptionist.service';
import { finalize, Subscription } from 'rxjs';
import { SnackbarService } from '../../material/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { BookAppointmentDialogComponent } from './book-appointment-dialog/book-appointment-dialog.component';
import { ConsentOtpDialogComponent } from '../../shared/components/consent-otp-dialog/consent-otp-dialog.component';
import { DeletePatientOtpDialogComponent } from '../../shared/components/delete-patient-otp-dialog/delete-patient-otp-dialog.component';

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
    patientSubscription: Subscription;

    constructor(
        private receptionistService: ReceptionistService,
        private snackbarService: SnackbarService,
        private dialog: MatDialog
    ) {
        this.isLoading = true;
        this.patientSubscription = this.receptionistService
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
        this.dialog
            .open(BookAppointmentDialogComponent, {
                data: patient,
            })
            .afterClosed()
            .subscribe({
                next: (booked: boolean) => {
                    // if (booked) {
                    //     this.snackbarService.openSnackBar('Appointment booked');
                    // } else {
                    //     this.snackbarService.openSnackBar(
                    //         'Appointment not possible'
                    //     );
                    // }
                },
                error: (err) => {
                    this.snackbarService.openSnackBar('Error : ', err);
                },
            });
    }

    toggleConsent(patient: Patient) {
        const dialogRef = this.dialog.open(ConsentOtpDialogComponent, {
            data: patient,
        });
    
        dialogRef.afterClosed().subscribe(result => {
                if (patient.consent == true && result === 'Consent removed successfully') {
                    patient.consent = false;
                }
                if (patient.consent == false && result === 'Consent added successfully') {
                    patient.consent = true;
                }
        });
    }

    deletePatient(patient: Patient) {
        const dialogRef = this.dialog.open(DeletePatientOtpDialogComponent, {
            data: patient,
        });
    }

    getFullAddress(patient: Patient) {
        return (
            patient.addressLine1 +
            (patient.addressLine2 ? ', ' + patient.addressLine2 : '') +
            (patient.city ? ', ' + patient.city : '') +
            (patient.state ? ', ' + patient.state : '') +
            (patient.country ? ', ' + patient.country : '')
        );
    }

    ngOnDestroy() {
        this.patientSubscription.unsubscribe();
    }
}
