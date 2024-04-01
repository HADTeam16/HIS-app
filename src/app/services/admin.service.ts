import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Api } from '../enums/api';
import { Observable, catchError, defaultIfEmpty, map } from 'rxjs';
import { Doctor, Nurse } from '../models/user';

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
                        id: item.user.id,
                        userName: item.user.userName,
                        password: item.user.password,
                        firstName: item.user.firstName,
                        middleName: item.user.middleName,
                        lastName: item.user.lastName,
                        age: item.user.age,
                        gender: item.user.gender,
                        dateOfBirth: item.user.dateOfBirth,
                        country: item.user.country,
                        state: item.user.state,
                        city: item.user.city,
                        addressLine1: item.user.addressLine1,
                        addressLine2: item.user.addressLine2,
                        landmark: item.user.landmark,
                        pinCode: item.user.pinCode,
                        contact: item.user.contact,
                        email: item.user.email,
                        profilePicture: item.user.profilePicture,
                        emergencyContactName: item.user.emergencyContactName,
                        emergencyContactNumber: item.user.emergencyContactNumber,
                        role: item.user.role,
                        isDisable: item.user.disable,
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
        
    getDoctorById(doctorId: number): Observable<Doctor> {
        return this.httpClient
            .get(environment.baseURL + Api.get_doctor_by_id + doctorId)
            .pipe(
                map((response: any) => ({
                    ...response.user,
                    medicalLicenseNumber: response.medicalLicenseNumber,
                    specialization: response.specialization,
                    boardCertification: response.boardCertification,
                    experience: response.experience,
                    medicalDegree: response.medicalDegree,
                    cv: response.cv,
                    drugScreeningResult: response.drugScreeningResult,
                    workStart: response.workStart,
                    workEnd: response.workEnd,
                }))
            );
        }
        
    updateDoctorById(doctorId: number, updatedDoctor: Doctor): Observable<Doctor> {
        return this.httpClient
            .put<Doctor>(`${environment.baseURL}${Api.update_doctor_by_id}/${doctorId}`, updatedDoctor);
    }
        
    toggleDoctorById(doctorId: number): Observable<string> {
    return this.httpClient.put<string>(`${environment.baseURL}${Api.toggle_user_status}/${doctorId}`, null)
        .pipe(
        catchError((error: any) => {
            console.error('An error occurred:', error); // Log the error
            throw 'Error occurred while toggling doctor status'; // Throw custom error message
        })
        );
    }
      
          
    
    getAllNurse() {
        return this.httpClient
            .get(environment.baseURL + Api.get_all_nurse)
            .pipe(
                defaultIfEmpty([]),
                map((nurse_list: any[]): Nurse[] => {
                    return nurse_list.map((item) => ({
                        id: item.user.id,
                        userName: item.user.userName,
                        password: item.user.password,
                        firstName: item.user.firstName,
                        middleName: item.user.middleName,
                        lastName: item.user.lastName,
                        age: item.user.age,
                        gender: item.user.gender,
                        dateOfBirth: item.user.dateOfBirth,
                        country: item.user.country,
                        state: item.user.state,
                        city: item.user.city,
                        addressLine1: item.user.addressLine1,
                        addressLine2: item.user.addressLine2,
                        landmark: item.user.landmark,
                        pinCode: item.user.pinCode,
                        contact: item.user.contact,
                        email: item.user.email,
                        profilePicture: item.user.profilePicture,
                        emergencyContactName: item.user.emergencyContactName,
                        emergencyContactNumber: item.user.emergencyContactNumber,
                        role: item.user.role,
                        isDisable: item.user.disable,
                        headNurse: item.headNurse
                    }));
                })
            );
    }
        
    registerDoctor(doctor: Doctor) {
        console.log("Inside AdminService");
        console.log(doctor);
        return this.httpClient.post(
            environment.baseURL + Api.register_doctor,
            doctor
        );
    }

    registerNurse(nurse: Nurse) {
        console.log("Inside AdminService");
        console.log(nurse);
        return this.httpClient.post(
            environment.baseURL + Api.register_nurse,
            nurse
        );
    }

}