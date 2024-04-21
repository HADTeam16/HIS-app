import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Api } from '../shared/enums/api';
import { defaultIfEmpty, map } from 'rxjs';
import { DoctorsAppointment } from '../shared/models/appointment';
import { User } from '../shared/models/user';
import { Ward } from '../shared/models/ward';

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
    ): Promise<string> {
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

    cancelAppointment(appointment_id: number): Promise<string> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .get(
                    environment.baseURL +
                        Api.cancel_appointment +
                        appointment_id
                )
                .subscribe({
                    next: (res: { message: string }) => {
                        if (
                            res.message == 'Appointment cancelled successfully'
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
    }

    //Ward functions
    getWardsData(): Promise<Ward[]> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .get(environment.baseURL + Api.get_all_wards_data)
                .subscribe({
                    next: (
                        wards: {
                            wardId: number;
                            floor: number;
                            wardNumber: number;
                            availableStatus: boolean;
                            appointment: { purpose: string };
                            managingNurse: {
                                headNurse: boolean;
                            };
                            patient: {
                                temperature: number;
                                bloodPressure: string;
                                heartRate: number;
                                weight: number;
                                user: User;
                            };
                            emergency: boolean;
                        }[]
                    ) => {
                        resolve(
                            wards.map((ward): Ward => {
                                const ward_data_mapping = {
                                    patientId: 0,
                                    firstName: '',
                                    middleName: '',
                                    lastName: '',
                                    gender: '',
                                    dateOfBirth: '',
                                    country: '',
                                    state: '',
                                    city: '',
                                    addressLine1: '',
                                    addressLine2: '',
                                    landmark: '',
                                    pinCode: '',
                                    contact: '',
                                    email: '',
                                    profilePicture: '',
                                    emergencyContactName: '',
                                    emergencyContactNumber: '',
                                    role: '',
                                    temperature: 0,
                                    bloodPressure: '',
                                    heartRate: 0,
                                    weight: 0,
                                    wardId: ward.wardId,
                                    floor: ward.floor,
                                    wardNumber: ward.wardNumber,
                                    availableStatus: ward.availableStatus,
                                    emergency: ward.emergency,
                                    purpose: '',
                                };
                                if (!ward.availableStatus && ward.patient) {
                                    ward_data_mapping.patientId =
                                        ward.patient.user.id;
                                    ward_data_mapping.firstName =
                                        ward.patient.user.firstName;
                                    ward_data_mapping.middleName =
                                        ward.patient.user.middleName;
                                    ward_data_mapping.lastName =
                                        ward.patient.user.lastName;
                                    ward_data_mapping.gender =
                                        ward.patient.user.gender;
                                    ward_data_mapping.dateOfBirth =
                                        ward.patient.user.dateOfBirth;
                                    ward_data_mapping.country =
                                        ward.patient.user.country;
                                    ward_data_mapping.state =
                                        ward.patient.user.state;
                                    ward_data_mapping.city =
                                        ward.patient.user.city;
                                    ward_data_mapping.addressLine1 =
                                        ward.patient.user.addressLine1;
                                    ward_data_mapping.addressLine2 =
                                        ward.patient.user.addressLine2;
                                    ward_data_mapping.landmark =
                                        ward.patient.user.landmark;
                                    ward_data_mapping.pinCode =
                                        ward.patient.user.pinCode;
                                    ward_data_mapping.contact =
                                        ward.patient.user.contact;
                                    ward_data_mapping.email =
                                        ward.patient.user.email;
                                    ward_data_mapping.profilePicture =
                                        ward.patient.user.profilePicture;
                                    ward_data_mapping.emergencyContactName =
                                        ward.patient.user.emergencyContactName;
                                    ward_data_mapping.emergencyContactNumber =
                                        ward.patient.user.emergencyContactNumber;
                                    ward_data_mapping.role =
                                        ward.patient.user.role;
                                    ward_data_mapping.temperature =
                                        ward.patient.temperature;
                                    ward_data_mapping.bloodPressure =
                                        ward.patient.bloodPressure;
                                    ward_data_mapping.heartRate =
                                        ward.patient.heartRate;
                                    ward_data_mapping.weight =
                                        ward.patient.weight;
                                    ward_data_mapping.purpose =
                                        ward.appointment?.purpose;
                                }
                                return ward_data_mapping;
                            })
                        );
                    },
                    error: (error: HttpErrorResponse) => {
                        reject(error.error.message);
                    },
                });
        });
    }
}
