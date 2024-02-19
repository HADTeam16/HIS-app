import { Component } from '@angular/core';

@Component({
    selector: 'app-patients',
    templateUrl: './patients.component.html',
    styleUrl: './patients.component.scss',
})
export class PatientsComponent {
    tableHeaders = [
        'patient_id',
        'name',
        'status',
        'age',
        'gender',
        'appointment_date',
        'ward_id',
    ];
    tableData = [
        {
            patient_id: 'P01',
            name: 'Anne Hathaway',
            status: 'active',
            age: 34,
            gender: 'F',
            appointment_date: new Date().toUTCString(),
            ward_id: 'W04',
        },
        {
            patient_id: 'P02',
            name: 'Bob Odenkirk',
            status: 'inactive',
            age: 45,
            gender: 'M',
            appointment_date: '',
            ward_id: '',
        },
        {
            patient_id: 'P03',
            name: 'Anjali Arora',
            status: 'active',
            age: 27,
            gender: 'F',
            appointment_date: '',
            ward_id: 'W05',
        },
        {
            patient_id: 'P04',
            name: 'Rajesh Kumar',
            status: 'active',
            age: 68,
            gender: 'M',
            appointment_date: new Date().toUTCString(),
            ward_id: '',
        },
        {
            patient_id: 'P05',
            name: 'Jack Daniel',
            status: 'inactive',
            age: 86,
            gender: 'O',
            appointment_date: '',
            ward_id: '',
        },
    ];

    viewPatientDetails(patient: {
        patient_id: string;
        name: string;
        status: string;
        age: number;
        gender: string;
        appointment_date: string;
        ward_id: string;
    }) {
        console.log(patient);
    }
}
