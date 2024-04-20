import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Api } from '../shared/enums/api';
import { BehaviorSubject, Observable, defaultIfEmpty, map, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { Ward, NeedWard } from '../shared/models/ward';

@Injectable()
export class NurseService {
    constructor(private httpClient: HttpClient) {}

    public isHeadNurseSubject: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false);

    isHeadNurse(nurseId: number) {
        return new Promise((resolve, reject) => {
            this.httpClient
                .get(environment.baseURL + Api.is_head_nurse + nurseId)
                .subscribe({
                    next: (res: { message: string }) => {
                        if (res.message === 'yes') {
                            this.isHeadNurseSubject.next(true);
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    },
                    error: (error: HttpErrorResponse) => {
                        reject(error.error.message);
                    },
                });
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
                tap((response) => console.log('Raw response:', response)),
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
                            emergencyContactName:
                                patient.user.emergencyContactName,
                            emergencyContactNumber:
                                patient.user.emergencyContactNumber,
                            role: patient.user.role,
                            disable: patient.disable,
                            temperature: patient.temperature,
                            bloodPressure: patient.bloodPressure,
                            heartRate: patient.heartRate,
                            weight: patient.weight,
                            needWardId: item.needWardId,
                            requestTime: item.requestTime,
                        };
                    });
                })
            );
    }

    assignWard(wardId: number, needWardId: number): Promise<string> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .get(
                    environment.baseURL +
                        Api.assign_ward +
                        wardId +
                        '/' +
                        needWardId
                )
                .subscribe((res: { message: string }) => {
                    if (res.message == 'assign ward success') {
                        resolve(res.message);
                    } else {
                        reject(res.message);
                    }
                });
        });
    }

    // For Nurse -

    getAllottedWards(nurseId: number): Promise<Ward[]> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .get(environment.baseURL + Api.get_allotted_wards + nurseId)
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

    updateAssignedPatientDetails(
        wardId: number,
        updatedPatientDetails: {
            temperature: number;
            bloodPressure: string;
            heartRate: number;
            weight: number;
        }
    ) {
        return new Promise((resolve, reject) => {
            this.httpClient
                .put(
                    environment.baseURL +
                        Api.update_ward_patient_details +
                        wardId,
                    updatedPatientDetails
                )
                .subscribe({
                    next: (res: any) => {
                        if (res.message == 'Updated') resolve(res.message);
                        else reject(res.message);
                    },
                    error: (error: HttpErrorResponse) => {
                        reject(error.error.message);
                    },
                });
        });
    }

    toggleEmergency(ward_id: number) {
        return new Promise((resolve, reject) => {
            this.httpClient
                .get(environment.baseURL + Api.call_emergency + ward_id)
                .subscribe({
                    next: (res: { message: string }) => {
                        if (
                            res.message ===
                            'Ward Emergency Status has been updated'
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
}
