import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorService } from '../../../services/doctor.service';
import { finalize } from 'rxjs';
import { SnackbarService } from '../../../material/services/snackbar.service';
import { DoctorsAppointment } from '../../../models/appointment';

@Component({
    selector: 'app-patient-history-dialog',
    templateUrl: './patient-history-dialog.component.html',
    styleUrl: './patient-history-dialog.component.scss',
})
export class PatientHistoryDialogComponent {
    isLoadingAppointments: boolean;
    appointments: number[] = [];
    isLoadingDetails: boolean;
    appointment: DoctorsAppointment | null = null;
    prescription: string;
    records: string[] = [];
    isPrescriptionText: boolean;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { patientId: number },
        private doctorService: DoctorService,
        private snackbarService: SnackbarService
    ) {
        this.isLoadingAppointments = true;
        this.doctorService
            .getPatientAppointments(this.data.patientId)
            .pipe(
                finalize(() => {
                    this.isLoadingAppointments = false;
                })
            )
            .subscribe({
                next: (val: number[]) => {
                    this.appointments = val;
                    this.snackbarService.openSnackBar(
                        'Appointments list fetched.'
                    );
                },
                error: (err) => {
                    this.snackbarService.openSnackBar('Error:' + err);
                },
            });
    }

    fetchAppointmentDetails(i: number) {
        this.isLoadingDetails = true;
        this.doctorService
            .getAppointmentDetails(this.appointments[i])
            .pipe(
                finalize(() => {
                    this.isLoadingDetails = false;
                })
            )
            .subscribe({
                next: (res: {
                    appointment: DoctorsAppointment;
                    prescription: string;
                    records: string[];
                }) => {
                    this.appointment = res.appointment;
                    this.prescription = res.prescription;
                    this.records = res.records;
                    this.snackbarService.openSnackBar("Appointment details fetched.");
                },
                error: (err) => {
                    this.snackbarService.openSnackBar('Error:' + err);
                },
            });
    }
}
