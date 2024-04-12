import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Api } from '../shared/enums/api';
import { BehaviorSubject } from 'rxjs';

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
}
