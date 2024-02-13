import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Api } from '../enums/api';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private baseURL = environment.baseURL;
    private token: string;

    constructor(private httpClient: HttpClient) {}

    setToken(token: string) {
        this.token = token;
        localStorage.setItem('HIS_user_token', token);
    }

    getToken(): string {
        return this.token ? this.token : localStorage.getItem('HIS_user_token');
    }

    login(userName: string, password: string, role: string) {
        return new Promise((resolve, reject) => {
            this.httpClient
                .post(this.baseURL + Api.login, {
                    userName,
                    password,
                    role,
                })
                .subscribe((msg) => {
                    console.log(msg);
                    if (msg['message'] == 'Login Success') {
                        this.setToken(msg['token']);
                        resolve(null);
                    }
                    reject(msg);
                });
        });
    }

    logout() {
        this.setToken('');
    }
}
