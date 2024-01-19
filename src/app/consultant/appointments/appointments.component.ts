import { Component } from '@angular/core';

@Component({
    selector: 'app-appointments',
    templateUrl: './appointments.component.html',
    styleUrl: './appointments.component.css',
})
export class AppointmentsComponent {
    selectedDate = new Date();
    selectedDateAppointments = [
        {
            patientId: 'Patient-001',
            timeslot: '10:00 AM - 10:30 AM',
            appointmentId: 'Apt-1001',
            patientContactNumber: '123-456-7890',
        },
        {
            patientId: 'Patient-002',
            timeslot: '10:30 AM - 10:45 AM',
            appointmentId: 'Apt-1002',
            patientContactNumber: '123-456-7890',
        },
        {
            patientId: 'Patient-003',
            timeslot: '10:45 AM - 11:00 AM',
            appointmentId: 'Apt-1003',
            patientContactNumber: '123-456-7890',
        },
        {
            patientId: 'Patient-004',
            timeslot: '11:00 AM - 11:30 AM',
            appointmentId: 'Apt-1004',
            patientContactNumber: '123-456-7890',
        },
        {
            patientId: 'Patient-005',
            timeslot: '11:30 AM - 12:00 AM',
            appointmentId: 'Apt-1005',
            patientContactNumber: '123-456-7890',
        },
    ];

    onDateChange(newDate: Date) {
        this.selectedDate = newDate;
    }

    setToday() {
        this.selectedDate = new Date();
    }

    setTomorrow() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.selectedDate = tomorrow;
    }
}
