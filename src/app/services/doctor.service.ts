import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Api } from '../enums/api';
import { defaultIfEmpty, map } from 'rxjs';
import { DoctorsAppointment } from '../models/appointment';

@Injectable()
export class DoctorService {
    constructor(private httpClient: HttpClient) {}

    getAppointments(date: string) {
        return this.httpClient
            .get(environment.baseURL + Api.get_appointment, {
                params: { date: date },
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
                                temperature:
                                    appointment['patient']['temperature'],
                                bloodPressure:
                                    appointment['patient']['bloodPressure'],
                                admissionDate:
                                    appointment['patient']['admissionDate'],
                                dischargeDate:
                                    appointment['patient']['dischargeDate'],
                            };
                        }
                    );
                })
            );
    }
}
