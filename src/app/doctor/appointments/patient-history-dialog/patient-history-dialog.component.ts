import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorService } from '../../doctor.service';
import { finalize } from 'rxjs';
import { SnackbarService } from '../../../material/services/snackbar.service';
import { DoctorsAppointment } from '../../../shared/models/appointment';

@Component({
    selector: 'app-patient-history-dialog',
    templateUrl: './patient-history-dialog.component.html',
    styleUrl: './patient-history-dialog.component.scss',
})
export class PatientHistoryDialogComponent {
    isLoadingAppointments: boolean;
    appointments: { appointmentId: number; dateTime: string }[] = [];
    isLoadingDetails: boolean;
    appointment: DoctorsAppointment | null = null;
    prescription: string;
    records: string[] = [];
    isPrescriptionText: boolean;
    loadedImage: string = '';

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: { patientId: number; date: Date },
        private doctorService: DoctorService,
        private snackbarService: SnackbarService
    ) {
        this.isLoadingAppointments = true;
        this.doctorService
            .getPatientAppointments(this.data.patientId, this.data.date)
            .pipe(
                finalize(() => {
                    this.isLoadingAppointments = false;
                })
            )
            .subscribe({
                next: (val: { appointmentId: number; dateTime: string }[]) => {
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
        this.loadedImage = '';
        this.isLoadingDetails = true;
        this.doctorService
            .getAppointmentDetails(this.appointments[i].appointmentId)
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
                    this.snackbarService.openSnackBar(
                        'Appointment details fetched.'
                    );
                },
                error: (err) => {
                    this.snackbarService.openSnackBar('Error:' + err);
                },
            });
    }
}
