import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Api } from '../shared/enums/api';
import { Observable, catchError, defaultIfEmpty, map } from 'rxjs';
import { Doctor, Nurse, Receptionist } from '../shared/models/user';

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
                        medicalDegree: item.medicalDegree,
                        cv: item.cv,
                        drugScreeningResult: item.drugScreeningResult,
                        workStart: item.workStart,
                        workEnd: item.workEnd,
                    }));
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

    getAllReceptionist() {
        return this.httpClient
            .get(environment.baseURL + Api.get_all_receptionist)
            .pipe(
                defaultIfEmpty([]),
                map((receptionist_list: any[]): Receptionist[] => {
                    return receptionist_list.map((item) => ({
                        id: item.user.id,
                        userName: item.user.userName,
                        password: item.user.password,
                        firstName: item.user.firstName,
                        middleName: item.user.middleName,
                        lastName: item.user.lastName,
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
                    medicalDegree: response.medicalDegree,
                    cv: response.cv,
                    drugScreeningResult: response.drugScreeningResult,
                    workStart: response.workStart,
                    workEnd: response.workEnd,
                }))
            );
    }
    
    getNurseById(nurseId: number): Observable<Nurse> {
        return this.httpClient
            .get(environment.baseURL + Api.get_nurse_by_id + nurseId)
            .pipe(
                map((response: any) => ({
                    ...response.user,
                    headNurse : response.headNurse,
                }))
            );
    }
    
    getReceptionistById(receptionistId: number): Observable<Receptionist> {
        return this.httpClient
            .get(environment.baseURL + Api.get_receptionist_by_id + receptionistId)
            .pipe(
                map((response: any) => ({
                    ...response.user,
                }))
            );
    }
    
        
    updateDoctorById(doctorId: number, updatedDoctor: Doctor): Observable<Doctor> {
        return this.httpClient
            .put<Doctor>(`${environment.baseURL}${Api.update_doctor_by_id}/${doctorId}`, updatedDoctor);
    }

    updateNurseById(nurseId: number, updatedNurse: Nurse): Observable<Nurse> {
        return this.httpClient
            .put<Nurse>(`${environment.baseURL}${Api.update_nurse_by_id}/${nurseId}`, updatedNurse);
    }
    
    updateReceptionistById(receptionistId: number, updatedReceptionist: Receptionist): Observable<Receptionist> {
        return this.httpClient
            .put<Receptionist>(`${environment.baseURL}${Api.update_receptionist_by_id}/${receptionistId}`, updatedReceptionist);
    }
        
    toggleDoctorById(doctorId: number): Observable<string> {
    return this.httpClient.put<string>(`${environment.baseURL}${Api.toggle_user_status}/${doctorId}`, null)
        .pipe(
        catchError((error: any) => {
            console.error('An error occurred:', error); 
            throw 'Error occurred while toggling doctor status'; 
        })
        );
    }

    toggleNurseById(nurseId: number): Observable<string> {
        return this.httpClient.put<string>(`${environment.baseURL}${Api.toggle_user_status}/${nurseId}`, null)
            .pipe(
            catchError((error: any) => {
                console.error('An error occurred:', error); 
                throw 'Error occurred while toggling nurse status'; 
            })
            );
    }
    
    toggleReceptionistById(receptionistId: number): Observable<string> {
        return this.httpClient.put<string>(`${environment.baseURL}${Api.toggle_user_status}/${receptionistId}`, null)
            .pipe(
            catchError((error: any) => {
                console.error('An error occurred:', error); 
                throw 'Error occurred while toggling receptionist status'; 
            })
            );
        }
        
    registerDoctor(doctor: Doctor) {
        return this.httpClient.post(
            environment.baseURL + Api.register_doctor,
            doctor
        );
    }

    registerNurse(nurse: Nurse) {
        return this.httpClient.post(
            environment.baseURL + Api.register_nurse,
            nurse
        );
    }

    registerReceptionist(receptionist: Receptionist) {
        return this.httpClient.post(
            environment.baseURL + Api.register_receptionist,
            receptionist
        );
    }
}