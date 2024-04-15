import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Api } from '../shared/enums/api';
import { BehaviorSubject, Observable, defaultIfEmpty, map, tap } from 'rxjs';
import { Patient } from '../shared/models/user';
import { Ward, NeedWard } from '../shared/models/ward';

@Injectable()
export class NurseService {
    constructor(private httpClient: HttpClient) {}

    public isHeadNurseSubject: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false);

    isHeadNurse(nurseId: number) {
        return this.httpClient
            .get(environment.baseURL + Api.is_head_nurse + nurseId)
            .subscribe((res: { message: string }) => {
                this.isHeadNurseSubject.next(res.message === 'yes');
            });
    }

    // Head Nurse -

    getAllAvailableWards(): Observable<number[]> {
        return this.httpClient.get<number[]>(
            environment.baseURL + Api.get_available_wards
        );
    }

    getPatientsWhoNeedsWards() {
        return this.httpClient
            .get(environment.baseURL + Api.get_patients_who_needs_wards)
            .pipe(
                tap(response => console.log('Raw response:', response)),
                defaultIfEmpty([]),
                map((needWard_list: any[]): NeedWard[] => {
                    return needWard_list.map((item) => {
                        const patient = item.appointment.patient; // Accessing the patient object from appointment
                        return {
                            firstName: patient.user.firstName,
                            middleName: patient.user.middleName,
                            lastName: patient.user.lastName,
                            gender: patient.user.gender,
                            dateOfBirth: patient.user.dateOfBirth,
                            country: patient.user.country,
                            state: patient.user.state,
                            city: patient.user.city,
                            addressLine1: patient.user.addressLine1,
                            addressLine2: patient.user.addressLine2,
                            landmark: patient.user.landmark,
                            pinCode: patient.user.pinCode,
                            contact: patient.user.contact,
                            email: patient.user.email,
                            profilePicture: patient.user.profilePicture,
                            emergencyContactName: patient.user.emergencyContactName,
                            emergencyContactNumber: patient.user.emergencyContactNumber,
                            role: patient.user.role,
                            isDisable: patient.disable,
                            temperature: patient.temperature,
                            bloodPressure: patient.bloodPressure,
                            height: patient.height,
                            weight: patient.weight,
                            needWardId: item.needWardId,
                            requestTime: item.requestTime,
                        };
                    });
                })
            );
    }    
    

    assignWard(wardId: number, needWardId: number): Observable<any> {
        return this.httpClient.get<any>(
            `${environment.baseURL}/assign/ward/${wardId}/${needWardId}`,
            {}
        );
    }

    // For Nurse -

    getAllottedWards(nurseId: number) {
        return this.httpClient
            .get(environment.baseURL + Api.get_allotted_wards + nurseId)
            .pipe(
                defaultIfEmpty([]),
                map((ward_list: any[]): Ward[] => {
                    return ward_list.map((item) => ({
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
                        emergencyContactNumber:
                            item.user.emergencyContactNumber,
                        role: item.user.role,
                        isDisable: item.user.disable,
                        temperature: item.user.temperature,
                        bloodPressure: item.user.bloodPressure,
                        height: item.user.height,
                        weight: item.user.weight,
                        headNurse: item.user.headNurse,
                        wardId: item.user.wardId,
                        floor: item.user.floor,
                        wardNumber: item.user.wardNumber,
                        availableStatus: item.user.availableStatus,
                    }));
                })
            );
    }

    getAssignedPatients() {
        return this.httpClient
            .get(environment.baseURL + Api.get_assigned_patients)
            .pipe(
                tap(response => console.log('Raw response:', response)), // Log the raw response
                map((response: any) => response.body), // Extract the array of patients from the 'body' property
                defaultIfEmpty([]),
                map((patient_list: any[]): Patient[] => {
                    return patient_list.map((item) => ({
                        id: item.id,
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
                        temperature: item.temperature,
                        bloodPressure: item.bloodPressure,
                        height: item.height,
                        weight: item.weight,
                    }));
                })
            );
    }    

    updateAssignedPatientDetails(
        patientId: number,
        updatedPatient: Patient
    ): Observable<Patient> {
        return this.httpClient.put<Patient>(
            `${environment.baseURL}${Api.update_assigned_patient_details}/${patientId}`,
            updatedPatient
        );
    }
}