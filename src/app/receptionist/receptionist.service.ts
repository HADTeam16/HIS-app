import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Api } from '../shared/enums/api';
import { catchError, defaultIfEmpty, map } from 'rxjs';
import { Doctor, Patient, PatientRegistration } from '../shared/models/user';
import { Appointment } from '../shared/models/appointment';
import { OT } from '../shared/models/ot';

@Injectable()
export class ReceptionistService {
    constructor(private httpClient: HttpClient) {}

    getAllPatients() {
        return this.httpClient
            .get(environment.baseURL + Api.get_all_patients)
            .pipe(
                defaultIfEmpty([]),
                map((patient_list: any[]): Patient[] => {
                    return patient_list.map((item) => ({
                        ...item.user,
                        purpose: item.purpose,
                        temperature: item.temperature,
                        bloodPressure: item.bloodPressure,
                        height: item.height,
                        weight: item.weight,
                    }));
                })
            );
    }

    registerPatient(patient: PatientRegistration) {
        return this.httpClient.post(
            environment.baseURL + Api.register_patient,
            patient
        );
    }

    getAllDoctors() {
        return this.httpClient
            .get(environment.baseURL + Api.get_all_doctors)
            .pipe(
                defaultIfEmpty([]),
                map((doctor_list: any[]): Doctor[] => {
                    return doctor_list.map((item) => ({
                        ...item.user,
                        medicalLicenseNumber: item.medicalLicenseNumber,
                        specialization: item.specialization,
                        boardCertification: item.boardCertification,
                        medicalDegree: item.medicalDegree,
                        cv: item.cv,
                        drugScreeningResult: item.drugScreeningResult,
                        workStart: item.workStart,
                        workEnd: item.workEnd,
                    }));
                })
            );
    }

    bookAppointment(appointment: Appointment) {
        return this.httpClient
            .post(environment.baseURL + Api.book_appointment, appointment)
            .pipe(
                defaultIfEmpty('Some error occured'),
                map((response) => response['response'])
            );
    }

    getAllOTData() {
        return this.httpClient.get(environment.baseURL + Api.get_ots).pipe(
            defaultIfEmpty([]),
            catchError(() => {
                return [];
            }),
            map(
                (
                    ots: {
                        otId: number;
                        availableStatus: boolean;
                        doctors: {}[];
                    }[]
                ): OT[] => {
                    return ots.map((ot): OT => {
                        return {
                            id: ot.otId,
                            status: ot.availableStatus,
                            doctors: ot.doctors.map((doc) => {
                                return {
                                    id: doc['doctorId'],
                                    specialization: doc['specialization'],
                                    first_name: doc['user']['firstName'],
                                    last_name: doc['user']['lastName'],
                                };
                            }),
                        };
                    });
                }
            )
        );
    }

    getAvailableSurgeons() {
        return this.httpClient
            .get(environment.baseURL + Api.get_available_surgeons)
            .pipe(
                defaultIfEmpty([]),
                catchError(() => {
                    return [];
                }),
                map((surgeons: {}[]) => {
                    return surgeons.map((surgeon) => {
                        return {
                            id: surgeon['doctorId'],
                            specialization: surgeon['specialization'],
                            first_name: surgeon['user']['firstName'],
                            last_name: surgeon['user']['lastName'],
                        };
                    });
                })
            );
    }

    bookOT(ot_id: number, surgeon_ids: number[]) {
        return new Promise((resolve, reject) => {
            this.httpClient
                .put(environment.baseURL + Api.book_ot + ot_id, surgeon_ids)
                .subscribe({
                    next: (res: { message: string }) => {
                        if (res.message == 'OT booking successful') {
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

    clearOT(ot_id: number) {
        return new Promise((resolve, reject) => {
            this.httpClient
                .get(environment.baseURL + Api.clear_ot + ot_id)
                .subscribe({
                    next: (res: { message: string }) => {
                        if (res.message == 'OT cleared successfully') {
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
