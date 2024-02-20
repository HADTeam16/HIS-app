import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Api } from '../enums/api';
import { catchError, defaultIfEmpty, map, throwError } from 'rxjs';
import { Patient } from '../models/user';

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
}
