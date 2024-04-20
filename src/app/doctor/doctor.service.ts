import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Api } from '../shared/enums/api';
import { defaultIfEmpty, finalize, map } from 'rxjs';
import { DoctorsAppointment } from '../shared/models/appointment';

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
                                gender: appointment['patient']['user'][
                                    'gender'
                                ],
                                dateOfBirth:
                                    appointment['patient']['user'][
                                        'dateOfBirth'
                                    ],
                                temperature: appointment['temperature'],
                                bloodPressure: appointment['bloodPressure'],
                                heartRate: appointment['heartRate'],
                                weight: appointment['weight'],
                                needWard: appointment['needWard'],
                                completed: appointment['completed'],
                            };
                        }
                    );
                })
            );
    }

    getPatientAppointments(patientId: number, date: Date) {
        return this.httpClient
            .get(environment.baseURL + Api.get_patient_appointment, {
                params: { patientId, date: date.toISOString() },
            })
            .pipe(defaultIfEmpty([]));
    }

    getAppointmentDetails(appointmentId: number) {
        return this.httpClient.get(
            environment.baseURL + Api.get_appointment_details + appointmentId
        );
    }

    addAppointmentData(
        appointmentId: number,
        prescription: string,
        records: string[],
        needWard: boolean
    ) {
        return new Promise((resolve, reject) => {
            this.httpClient
                .post(environment.baseURL + Api.finish_appointment, {
                    appointmentId,
                    prescription,
                    records,
                    needWard,
                })
                .subscribe({
                    next: (res: { message: string }) => {
                        if (
                            res.message == 'Appointment finished successfully'
                        ) {
                            resolve(res.message);
                        } else {
                            reject(res.message);
                        }
                    },
                    error: (error: HttpErrorResponse) => {
                        reject(error.error.message);
                    },
                });
        });
        // const promises: Promise<string>[] = [
        //     new Promise((resolve, reject) => {
        //         this.httpClient
        //             .post(
        //                 environment.baseURL +
        //                     Api.add_prescription +
        //                     appointment_id,
        //                 prescription
        //             )
        //             .subscribe({
        //                 next: (res: string) => {
        //                     resolve(res);
        //                 },
        //                 error: (err) => reject(err),
        //             });
        //     }),
        //     new Promise((resolve, reject) => {
        //         this.httpClient
        //             .post(
        //                 environment.baseURL + Api.add_records + appointment_id,
        //                 records
        //             )
        //             .subscribe({
        //                 next: (res: string) => {
        //                     resolve(res);
        //                 },
        //                 error: (err) => reject(err),
        //             });
        //     }),
        // ];
        // if (needWard) {
        //     promises.push(
        //         new Promise((resolve, reject) => {
        //             this.httpClient
        //                 .get(
        //                     environment.baseURL +
        //                         Api.add_to_ward_queue +
        //                         appointment_id
        //                 )
        //                 .subscribe({
        //                     next: (res: string) => {
        //                         resolve(res);
        //                     },
        //                     error: (err) => reject(err),
        //                 });
        //         })
        //     );
        // }
        // return Promise.all([promises]);
    }

    cancelAppointment(appointment_id: number) {
        return new Promise((resolve, reject) => {
            this.httpClient
                .get(
                    environment.baseURL +
                        Api.cancel_appointment +
                        appointment_id
                )
                .subscribe({
                    next: (res: { message: string }) => {
                        if (res.message == 'Appointment cancelled successfully') {
                            resolve(res.message);
                        } else {
                            reject(res.message);
                        }
                    },
                    error: (error: HttpErrorResponse) => {
                        reject(error.error.message);
                    },
                });
        });
    }
}
