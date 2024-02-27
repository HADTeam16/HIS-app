import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from '../../models/user';
import { AllocateWardDialogComponent } from './allocate-ward-dialog/allocate-ward-dialog.component';

@Component({
  selector: 'app-assign-ward',
  templateUrl: './assign-ward.component.html',
  styleUrl: './assign-ward.component.scss'
})
export class AssignWardComponent {
  isLoading = false;
    tableHeaders = ['id', 'firstName', 'lastName', 'age', 'gender'];
    headerAlias = {
        id: 'Patient ID',
        firstName: 'First name',
        lastName: 'Last name',
    };
    tableData: Patient[] = [
        {
            id: 1,
            userName: '',
            password: '',
            firstName: 'Anne',
            middleName: '',
            lastName: 'Hathaway',
            age: 34,
            gender: 'Female',
            dateOfBirth: new Date().toDateString(),
            country: 'America',
            state: 'California',
            city: 'San Diego',
            addressLine1: 'addr line 1',
            addressLine2: 'addr line 2',
            landmark: 'landmark',
            pinCode: '657832',
            contact: '1234567890',
            email: 'anne@gmail.com',
            profilePicture: 'path/to/profile',
            emergencyContactName: 'er name',
            emergencyContactNumber: '1234567890',
            role: 'patient',
            purpose: 'regular checkup',
            temperature: '93C',
            bloodPressure: '108Hg',
            admissionDate: new Date().toDateString(),
            dischargeDate: '',
        },
        {
            id: 2,
            userName: '',
            password: '',
            firstName: 'Bob',
            middleName: '',
            lastName: 'Odenkirk',
            age: 45,
            gender: 'Male',
            dateOfBirth: new Date().toDateString(),
            country: 'America',
            state: 'California',
            city: 'San Diego',
            addressLine1: 'addr line 1',
            addressLine2: 'addr line 2',
            landmark: 'landmark',
            pinCode: '657832',
            contact: '1234567890',
            email: 'bob@gmail.com',
            profilePicture: 'path/to/profile',
            emergencyContactName: 'er name',
            emergencyContactNumber: '1234567890',
            role: 'patient',
            purpose: 'regular checkup',
            temperature: '93C',
            bloodPressure: '108Hg',
            admissionDate: new Date().toUTCString(),
            dischargeDate: '',
        },
        {
            id: 3,
            userName: '',
            password: '',
            firstName: 'Subhash',
            middleName: '',
            lastName: 'Sen',
            age: 27,
            gender: 'Male',
            dateOfBirth: new Date().toDateString(),
            country: 'India',
            state: 'West Bengal',
            city: 'Kolkata',
            addressLine1: 'addr line 1',
            addressLine2: 'addr line 2',
            landmark: 'landmark',
            pinCode: '657832',
            contact: '1234567890',
            email: 'subhash@gmail.com',
            profilePicture: 'path/to/profile',
            emergencyContactName: 'er name',
            emergencyContactNumber: '1234567890',
            role: 'patient',
            purpose: 'regular checkup',
            temperature: '93C',
            bloodPressure: '108Hg',
            admissionDate: new Date().toUTCString(),
            dischargeDate: '',
        },
        {
            id: 4,
            userName: '',
            password: '',
            firstName: 'Rajesh',
            middleName: '',
            lastName: 'Kumar',
            age: 68,
            gender: 'Male',
            dateOfBirth: new Date().toDateString(),
            country: 'India',
            state: 'West Bengal',
            city: 'Kolkata',
            addressLine1: 'addr line 1',
            addressLine2: 'addr line 2',
            landmark: 'landmark',
            pinCode: '657832',
            contact: '1234567890',
            email: 'rajesh@gmail.com',
            profilePicture: 'path/to/profile',
            emergencyContactName: 'er name',
            emergencyContactNumber: '1234567890',
            role: 'patient',
            purpose: 'regular checkup',
            temperature: '93C',
            bloodPressure: '108Hg',
            admissionDate: new Date().toUTCString(),
            dischargeDate: '',
        },
        {
            id: 5,
            userName: '',
            password: '',
            firstName: 'Neha',
            middleName: '',
            lastName: 'Sharma',
            age: 78,
            gender: 'Female',
            dateOfBirth: new Date().toDateString(),
            country: 'India',
            state: 'Maharashtra',
            city: 'Mumbai',
            addressLine1: 'addr line 1',
            addressLine2: 'addr line 2',
            landmark: 'landmark',
            pinCode: '657832',
            contact: '1234567890',
            email: 'neha@gmail.com',
            profilePicture: 'path/to/profile',
            emergencyContactName: 'er name',
            emergencyContactNumber: '1234567890',
            role: 'patient',
            purpose: 'regular checkup',
            temperature: '93C',
            bloodPressure: '108Hg',
            admissionDate: new Date().toUTCString(),
            dischargeDate: '',
        },
    ];

    constructor(
        private dialog: MatDialog
    ) {
    }

    bookAppointment(patient: Patient) {
        const dialogRef = this.dialog.open(AllocateWardDialogComponent, {
            data: patient,
        });
        dialogRef.afterClosed().subscribe({
            next: (booked: boolean) => {
                if (booked) {
                    console.log('Appointment booked');
                } else {
                    console.log('Appointment not possible');
                }
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    getFullAddress(patient: Patient) {
        return (
            patient.addressLine1 +
            ', ' +
            patient.addressLine2 +
            ', ' +
            patient.city +
            ', ' +
            patient.state +
            ', ' +
            patient.country
        );
    }
}
