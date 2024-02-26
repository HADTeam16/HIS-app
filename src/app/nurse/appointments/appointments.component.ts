import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDetailsDialogComponent } from './edit-details-dialog/edit-details-dialog.component';

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
            patientName: 'Prashant Sharma',
            wardNumber: 'Ward-1',
            appointmentId: 'Apt-1001',
            patientContactNumber: '123-456-7890',
            bloodPressure: '130.2',
            oxygenLevel: '82.2',
            temprature: '96.7 °F',
            heartRate : '122.9 bpm',
        },
        {
            patientId: 'Patient-002',
            patientName: 'Rahul Yadav',
             wardNumber: 'Ward-2',
            appointmentId: 'Apt-1002',
            patientContactNumber: '123-456-7890',
            bloodPressure: '130.2',
            oxygenLevel: '82.2',
            temprature: '96.7 °F',
            heartRate : '122.9 bpm',
        },
        {
            patientId: 'Patient-003',
            patientName: 'Dharemendra Kulkarni',
          wardNumber: 'Ward-3',
            appointmentId: 'Apt-1003',
          patientContactNumber: '123-456-7890',
          bloodPressure: '130.2',
          oxygenLevel: '82.2',
          temprature: '96.7 °F',
          heartRate : '122.9 bpm',
        },
        {
            patientId: 'Patient-004',
            patientName: 'Shilpa Srivastav',
            wardNumber: 'Ward-4',
            appointmentId: 'Apt-1004',
            patientContactNumber: '123-456-7890',
            bloodPressure: '130.2',
            oxygenLevel: '82.2',
            temprature: '96.7 °F',
            heartRate : '122.9 bpm',
        },
        {
            patientId: 'Patient-005',
            patientName: 'Naman Haldwani',
            wardNumber: 'Ward-5',
            appointmentId: 'Apt-1005',
            patientContactNumber: '123-456-7890',
            bloodPressure: '130.2',
            oxygenLevel: '82.2',
            temprature: '96.7 °F',
            heartRate : '122.9 bpm',
        },
    ];

    constructor(private dialog: MatDialog) { }
    
    editDetails(ele:any){
      this.dialog.open(EditDetailsDialogComponent, {
          height: '40%',
          width: '30%',
          data: ele,
      });
  }
}
