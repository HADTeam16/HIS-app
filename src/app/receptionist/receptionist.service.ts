import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Api } from '../shared/enums/api';
import { defaultIfEmpty, map } from 'rxjs';
import { Doctor, Patient, PatientRegistration } from '../shared/models/user';
import { Appointment } from '../shared/models/appointment';

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
}
