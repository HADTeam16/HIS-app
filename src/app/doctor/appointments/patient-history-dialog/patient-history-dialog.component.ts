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

    formatDate(dateString: string) {
        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];
        const suffixes = ['th', 'st', 'nd', 'rd'];

        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        let hour = date.getHours();
        const minute = date.getMinutes();
        const ampm = hour >= 12 ? 'PM' : 'AM';

        hour = hour % 12;
        hour = hour ? hour : 12; // the hour '0' should be '12'
        const minuteStr = minute < 10 ? '0' + minute : minute;

        const daySuffix = suffixes[(day % 10) - 1] || suffixes[0];

        return `${day}${daySuffix} ${month}, ${year} - ${hour}:${minuteStr}${ampm}`;
    }
}
