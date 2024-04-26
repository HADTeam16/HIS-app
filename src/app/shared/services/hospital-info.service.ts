import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Api } from '../enums/api';
import { HospitalStats } from '../models/hospital-stats';

@Injectable()
export class HospitalInfoService {
    constructor(private httpClient: HttpClient) {}

    getHospitalStats(): Promise<HospitalStats> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .get(environment.baseURL + Api.get_live_stats)
                .subscribe({
                    next: (res: HospitalStats) => {
                        resolve(res);
                    },
                    error: (error: HttpErrorResponse) => {
                        reject(error.error.message);
                    },
                });
        });
    }
}
