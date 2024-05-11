import { Component, ViewChild } from '@angular/core';
import { PrescriptionDialogComponent } from './prescription-dialog/prescription-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DoctorService } from '../doctor.service';
import { Subscription, finalize } from 'rxjs';
import { DoctorsAppointment } from '../../shared/models/appointment';
import { SnackbarService } from '../../material/services/snackbar.service';
import { PatientHistoryDialogComponent } from './patient-history-dialog/patient-history-dialog.component';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { UtilityService } from '../../shared/services/utility.service';
import { CancelAppointmentDialogComponent } from './cancel-appointment-dialog/cancel-appointment-dialog.component';
import { BreakpointService } from '../../material/services/breakpoint.service';

@Component({
    selector: 'app-appointments',
    templateUrl: './appointments.component.html',
})
export class AppointmentsComponent {
    isLoading: boolean;
    isToday: boolean;
    isPast: boolean;
    selectedDate = new Date();
    getAppointmentSub: Subscription;
    selectedDateAppointments: DoctorsAppointment[] = [];
    displayAppointments: DoctorsAppointment[] = [];
    @ViewChild(MatButtonToggleGroup)
    appointmentStatusToggle: MatButtonToggleGroup;
    isTablet: boolean;
    bpsub: Subscription;

    constructor(
        private doctorService: DoctorService,
        private dialog: MatDialog,
        private snackbarService: SnackbarService,
        private utilityService: UtilityService,
        private breakPointService: BreakpointService
    ) {
        this.onDateChange(new Date());
    }

    ngOnInit() {
        this.bpsub = this.breakPointService.isTablet.subscribe((res) => {
            this.isTablet = res;
        });
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

    onStatusToggle(val: string) {
        switch (val) {
            case 'all':
                this.displayAppointments = this.selectedDateAppointments;
                break;
            case 'upcoming':
                this.displayAppointments = this.selectedDateAppointments.filter(
                    (el) => el.completed == 0
                );
                break;
            case 'completed':
                this.displayAppointments = this.selectedDateAppointments.filter(
                    (el) => el.completed == 1
                );
                break;
            case 'cancelled':
                this.displayAppointments = this.selectedDateAppointments.filter(
                    (el) => el.completed == -1
                );
        }
    }

    onDateChange(newDate: Date) {
        this.selectedDate = newDate;
        this.isToday = this.utilityService.isToday(newDate);
        this.isPast = this.utilityService.isPast(newDate);
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

    cancelAppointment(appointment_id: number) {
        this.dialog
            .open(CancelAppointmentDialogComponent)
            .afterClosed()
            .subscribe((res) => {
                if (res == 'yes') {
                    this.doctorService
                        .cancelAppointment(appointment_id)
                        .then((res: string) => {
                            this.snackbarService.openSnackBar(res);
                            const i = this.selectedDateAppointments.findIndex(
                                (el) => el.appointmentId == appointment_id
                            );
                            this.selectedDateAppointments[i].completed = -1;
                            this.appointmentStatusToggle.value = 'cancelled';
                        });
                }
            });
    }

    finishAppointment(appointment_id: number) {
        this.dialog
            .open(PrescriptionDialogComponent, {
                height: '80%',
                width: '80%',
                data: {
                    appointment_id,
                },
            })
            .afterClosed()
            .subscribe({
                next: (res) => {
                    if (res == 'success') {
                        const i = this.selectedDateAppointments.findIndex(
                            (el) => el.appointmentId == appointment_id
                        );
                        this.selectedDateAppointments[i].completed = 1;
                        this.appointmentStatusToggle.value = 'completed';
                    }
                },
            });
    }

    viewHistory(patientId: number, appointmentDate: string) {
        this.dialog.open(PatientHistoryDialogComponent, {
            height: '80%',
            width: '80%',
            data: { patientId, date: new Date(appointmentDate) },
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
        this.bpsub.unsubscribe();
    }
}
