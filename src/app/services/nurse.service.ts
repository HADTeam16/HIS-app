import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Api } from '../enums/api';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Doctor, Nurse, Receptionist } from '../models/user';

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
}
