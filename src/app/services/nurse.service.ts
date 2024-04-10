import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Api } from '../enums/api';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Patient, Nurse } from '../models/user';

@Injectable()
export class NurseService {
  constructor(private httpClient: HttpClient) { }

  public isHeadNurseSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isHeadNurse(nurseId: number): Observable<boolean> {
    console.log("Called Head Nurse");
    return this.httpClient
      .get(environment.baseURL + Api.is_head_nurse + nurseId)
      .pipe(
        map((response: any) => { console.log("Called API"); return response.message === 'yes'}),
              tap((isHeadNurse: boolean) => this.isHeadNurseSubject.next(isHeadNurse))
          );
  }

  // For Head Nurse - 
  getPatientsWhoNeedsWards() {
    return this.httpClient
            .get(environment.baseURL + Api.get_all_doctors)
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
                        emergencyContactNumber: item.user.emergencyContactNumber,
                        role: item.user.role,
                        isDisable: item.user.disable,
                        
                    }));
                })
            );
  }

}
