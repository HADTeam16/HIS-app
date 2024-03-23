import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Api } from '../enums/api';
import { defaultIfEmpty, map } from 'rxjs';
import { Doctor } from '../models/user';

@Injectable()
export class AdminService {
    constructor(private httpClient: HttpClient) { }

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
        // getAllNurse() {
        //     return this.httpClient
        //         .get(environment.baseURL + Api.get_all_doctors)
        //         .pipe(
        //             defaultIfEmpty([]),
        //             map((doctor_list: any[]): Doctor[] => {
        //                 return doctor_list.map((item) => ({
        //                     ...item.user,
        //                     headNurse: item.headNurse
        //                 }));
        //             })
        //         );
    //     }
        
    registerDoctor(doctor: Doctor) {
        console.log("Inside AdminService");
        console.log(doctor);
            return this.httpClient.post(
                environment.baseURL + Api.register_doctor,
                doctor
            );
        }

    }