import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Api } from '../enums/api';
import { defaultIfEmpty, map } from 'rxjs';
import { Doctor, Patient } from '../models/user';
import { Appointment } from '../models/appointment';

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
                        admissionDate: item.admissionDate,
                        dischargeDate: item.dischargeDate,
                    }));
                })
            );
    }

    registerPatient(patient: Patient) {
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
                        experience: item.experience,
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
