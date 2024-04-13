import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Api } from '../shared/enums/api';
import { BehaviorSubject, Observable, defaultIfEmpty, map } from 'rxjs';
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
                defaultIfEmpty([]),
                map((needWard_list: any[]): NeedWard[] => {
                    return needWard_list.map((item) => ({
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
                        emergencyContactNumber:
                            item.user.emergencyContactNumber,
                        role: item.user.role,
                        isDisable: item.user.disable,
                        temperature: item.user.temperature,
                        bloodPressure: item.user.bloodPressure,
                        height: item.user.height,
                        weight: item.user.weight,
                        needWardId: item.user.needWardId,
                        requestTime: item.user.requestTime,
                    }));
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
                defaultIfEmpty([]),
                map((patient_list: any[]): Patient[] => {
                    return patient_list.map((item) => ({
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
                        emergencyContactNumber:
                            item.user.emergencyContactNumber,
                        role: item.user.role,
                        isDisable: item.user.disable,
                        temperature: item.user.temperature,
                        bloodPressure: item.user.bloodPressure,
                        height: item.user.height,
                        weight: item.user.weight,
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