import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Api } from '../enums/api';
import { defaultIfEmpty, map, Observable } from 'rxjs';
import { Appointment, DoctorsAppointment } from '../models/appointment';

@Injectable()
export class DoctorService {
    constructor(private httpClient: HttpClient) {}

    getAppointments(date: string) {
        return this.httpClient
            .get(environment.baseURL + Api.get_appointment, {
                params: { date },
            })
            .pipe(
                defaultIfEmpty([]),
                map((appointments: any[]): DoctorsAppointment[] => {
                    return appointments.map(
                        (appointment): DoctorsAppointment => {
                            return {
                                doctorId: appointment['doctor']['doctorId'],
                                patientId: appointment['patient']['id'],
                                purpose: appointment['purpose'],
                                slot: appointment['slot'],
                                appointmentId: appointment['appointmentId'],
                                contact:
                                    appointment['patient']['user']['contact'],
                                name:
                                    appointment['patient']['user'][
                                        'firstName'
                                    ] +
                                    ' ' +
                                    appointment['patient']['user']['lastName'],
                                age: appointment['patient']['user']['age'],
                                gender: appointment['patient']['user'][
                                    'gender'
                                ],
                                temperature: appointment['temperature'],
                                bloodPressure: appointment['bloodPressure'],
                                height: appointment['height'],
                                weight: appointment['weight'],
                                needWard: appointment['needWard'],
                            };
                        }
                    );
                })
            );
    }

    getPatientAppointments(patientId: number) {
        return this.httpClient
            .get(environment.baseURL + Api.get_patient_appointment, {
                params: { patientId, date: new Date().toISOString() },
            })
            .pipe(defaultIfEmpty([]));
    }

    getAppointmentDetails(appointmentId: number) {
        return this.httpClient.get(
            environment.baseURL + Api.get_appointment_details + appointmentId
        );
    }

    addAppointmentData(
        appointment_id: number,
        prescription: string,
        records: string[]
    ) {
        return Promise.all([
            new Promise((resolve, reject) => {
                this.httpClient
                    .post(
                        environment.baseURL +
                            Api.add_prescription +
                            appointment_id,
                        prescription
                    )
                    .subscribe({
                        next: (res) => {
                            resolve(res);
                        },
                        error: (err) => reject(err),
                    });
            }),
            new Promise((resolve, reject) => {
                this.httpClient
                    .post(
                        environment.baseURL + Api.add_records + appointment_id,
                        { arr: records }
                    )
                    .subscribe({
                        next: (res) => {
                            resolve(res);
                        },
                        error: (err) => reject(err),
                    });
            }),
        ]);
    }
}
