import { Component } from '@angular/core';
import { PrescriptionDialogComponent } from './prescription-dialog/prescription-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DoctorService } from '../doctor.service';
import { Subscription, finalize } from 'rxjs';
import { DoctorsAppointment } from '../../shared/models/appointment';
import { SnackbarService } from '../../material/services/snackbar.service';
import { PatientHistoryDialogComponent } from './patient-history-dialog/patient-history-dialog.component';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { UtilityService } from '../../shared/services/utility.service';

@Component({
    selector: 'app-appointments',
    templateUrl: './appointments.component.html',
})
export class AppointmentsComponent {
    isLoading: boolean;
    isToday: boolean;
    selectedDate = new Date();
    getAppointmentSub: Subscription;
    selectedDateAppointments: DoctorsAppointment[] = [];
    displayAppointments: DoctorsAppointment[] = [];

    constructor(
        private doctorService: DoctorService,
        private dialog: MatDialog,
        private snackbarService: SnackbarService,
        private utilityService: UtilityService
    ) {
        this.onDateChange(new Date());
    }

    getAppointmentList(date: string) {
        this.isLoading = true;
        this.getAppointmentSub = this.doctorService
            .getAppointments(date)
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                })
            )
            .subscribe({
                next: (response) => {
                    this.selectedDateAppointments = response;
                    this.displayAppointments = response;
                    this.snackbarService.openSnackBar('Appointments loaded');
                },
                error: () => {
                    this.snackbarService.openSnackBar(
                        'Appointments failed to load'
                    );
                },
            });
    }

    onStatusToggle(event: MatButtonToggleChange) {
        switch (event.value) {
            case 'all':
                this.displayAppointments = this.selectedDateAppointments;
                break;
            case 'upcoming':
                this.displayAppointments = this.selectedDateAppointments.filter(
                    (el) => !el.completed
                );
                break;
            case 'completed':
                this.displayAppointments = this.selectedDateAppointments.filter(
                    (el) => el.completed
                );
                break;
        }
    }

    onDateChange(newDate: Date) {
        this.selectedDate = newDate;
        this.isToday = this.utilityService.isToday(newDate);
        const formattedDate = new Intl.DateTimeFormat('en-IN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'Asia/Kolkata',
        })
            .format(newDate)
            .split('/')
            .reverse()
            .join('-');
        this.getAppointmentList(formattedDate);
    }

    setToday() {
        this.onDateChange(new Date());
    }

    setTomorrow() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.onDateChange(tomorrow);
    }

    finishAppointment(appointment_id: number) {
        this.dialog.open(PrescriptionDialogComponent, {
            height: '80%',
            width: '80%',
            data: {
                appointment_id: appointment_id,
                prescription: 'helloworld',
            },
        });
    }

    viewHistory(patientId: number) {
        this.dialog.open(PatientHistoryDialogComponent, {
            height: '80%',
            width: '80%',
            data: { patientId, date: this.selectedDate },
        });
    }

    formatTime(dateString: string) {
        const date = new Date(dateString);
        let hour = date.getHours();
        const minute = date.getMinutes();
        const ampm = hour >= 12 ? 'PM' : 'AM';

        hour = hour % 12;
        hour = hour ? hour : 12; // the hour '0' should be '12'
        const minuteStr = minute < 10 ? '0' + minute : minute;

        return `${hour}:${minuteStr}${ampm}`;
    }

    ngOnDestroy() {
        this.getAppointmentSub.unsubscribe();
    }
}
