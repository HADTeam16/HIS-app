import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Api } from '../enums/api';
import { Stats } from '../models/ward';

@Injectable()
export class WardService {
    constructor(private httpClient: HttpClient) {}

    getWardHistory(ward_id: number): Promise<Stats[]> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .get(environment.baseURL + Api.get_ward_history + ward_id)
                .subscribe({
                    next: (res: Stats[]) => {
                        resolve(res);
                    },
                    error: (err: HttpErrorResponse) => {
                        reject(err.error.message);
                    },
                });
        });
    }
}
