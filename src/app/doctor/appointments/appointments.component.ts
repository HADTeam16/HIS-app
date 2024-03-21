import { Component } from '@angular/core';
import { PrecriptionDialogComponent } from './precription-dialog/precription-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DoctorService } from '../../services/doctor.service';
import { Subscription, finalize } from 'rxjs';
import { DoctorsAppointment } from '../../models/appointment';
import { SnackbarService } from '../../material/services/snackbar.service';

@Component({
    selector: 'app-appointments',
    templateUrl: './appointments.component.html',
    styleUrl: './appointments.component.css',
})
export class AppointmentsComponent {
    isLoading: boolean;
    selectedDate = new Date();
    getAppointmentSub: Subscription;
    selectedDateAppointments: DoctorsAppointment[] = [];

    constructor(
        private doctorService: DoctorService,
        private dialog: MatDialog,
        private snackbarService: SnackbarService
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
                    this.snackbarService.openSnackBar('Appointments loaded');
                },
                error: () => {
                    this.snackbarService.openSnackBar(
                        'Appointments failed to load'
                    );
                },
            });
    }

    onDateChange(newDate: Date) {
        this.selectedDate = newDate;
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

    addPrescription(appointment_id: number) {
        this.dialog.open(PrecriptionDialogComponent, {
            height: '80%',
            width: '80%',
            data: {
                appointment_id: appointment_id,
                prescription: 'helloworld',
            },
        });
    }

    formatDate(dateString) {
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

        return `${day}${daySuffix} ${month}, ${year} ${hour}:${minuteStr}${ampm}`;
    }

    ngOnDestroy() {
        this.getAppointmentSub.unsubscribe();
    }
}
