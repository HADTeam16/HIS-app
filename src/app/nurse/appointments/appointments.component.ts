import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
  
  
export class AppointmentsComponent {
  selectedDate = new Date();
    selectedDateAppointments = [
        {
            patientId: 'Patient-001',
            timeslot: '10:00 AM - 10:30 AM',
            wardNumber: 'Ward-1',
            appointmentId: 'Apt-1001',
            patientContactNumber: '123-456-7890',
        },
        {
            patientId: 'Patient-002',
          timeslot: '10:30 AM - 10:45 AM',
          wardNumber: 'Ward-2',
            appointmentId: 'Apt-1002',
            patientContactNumber: '123-456-7890',
        },
        {
            patientId: 'Patient-003',
          timeslot: '10:45 AM - 11:00 AM',
          wardNumber: 'Ward-3',
            appointmentId: 'Apt-1003',
            patientContactNumber: '123-456-7890',
        },
        {
            patientId: 'Patient-004',
          timeslot: '11:00 AM - 11:30 AM',
          wardNumber: 'Ward-4',
            appointmentId: 'Apt-1004',
            patientContactNumber: '123-456-7890',
        },
        {
            patientId: 'Patient-005',
          timeslot: '11:30 AM - 12:00 AM',
          wardNumber: 'Ward-5',
            appointmentId: 'Apt-1005',
            patientContactNumber: '123-456-7890',
        },
    ];

    constructor(private dialog:MatDialog){}
}
