import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Api } from '../enums/api';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { ChangePasswordRequest } from '../models/user';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
    private baseURL = environment.baseURL;
    private tokenExpirationTimer: any;

    user = new BehaviorSubject<User>(null);
    private token: string;

    constructor(private httpClient: HttpClient, private router: Router) {}

    isAuthenticated(): boolean {
        return !!this.token;
    }

    getAuthorizationToken(): string {
        return this.token ? this.token : localStorage.getItem('HIS_user_token');
    }

    login(userName: string, password: string, role: string) {
        return this.httpClient
            .post(this.baseURL + Api.login, { userName, password, role })
            .pipe(
                tap((msg) => {
                    if (msg['message'] == 'Login Success') {
                        localStorage.setItem('HIS_user_token', msg['token']);
                        this.token = msg['token'];
                        localStorage.setItem(
                            'HIS_user',
                            JSON.stringify(msg['user'])
                        );
                        this.user.next(msg['user']);
                        // this.autoLogout();
                    }
                })
            );
    }

    autoLogin() {
        const loadedToken: string = localStorage.getItem('HIS_user_token');
        const loadedUser: User = JSON.parse(localStorage.getItem('HIS_user'));
        if (!loadedUser) return;
        if (loadedToken) {
            this.token = loadedToken;
            this.user.next(loadedUser);
            this.router.navigate([this.user.value.role]);
            // const expirationDuration =new Date(userData._tokenExpirationDate).getTime()-new Date().getTime();
            // this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.token = '';
        localStorage.removeItem('HIS_user_token');
        this.user.next(null);
        localStorage.removeItem('HIS_user');
        this.router.navigate(['lobby']);
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    sendOTPForForgetPasswordRequest(email: string) {
        return this.httpClient.post(
            this.baseURL + Api.send_otp_forget_password_user + '/' + email,
            {}
        );
    }

    sendOTPforConsentRequest(email: string) {
        return this.httpClient.post(
            this.baseURL + Api.send_otp_for_consent_remove,
            { username: email, email: email, name: email }
        );
    }

    sendOTPforPatientDelete(id: number) {
        return this.httpClient.get(
            this.baseURL + Api.send_otp_for_delete_patient + '/' + id,
            {}
        );
    }

    verifyOTPForForgetPasswordRequest(
        email: string,
        otp: string
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .post(
                    this.baseURL +
                        Api.verify_otp_forget_password_user +
                        '/' +
                        email +
                        '/' +
                        otp,
                    {}
                )
                .subscribe({
                    next: (res: { message: string }) => {
                        if (res.message == 'Password updated successfully') {
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

    verifyOTPForRemoveConsentRequest(
        email: string,
        otp: string
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .post(this.baseURL + Api.user_remove_consent, {
                    username: email,
                    otpNumber: otp,
                })
                .subscribe({
                    next: (res: { message: string }) => {
                        if (res.message == 'Consent removed successfully') {
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

    changeUserPassword(
        changePasswordRequest: ChangePasswordRequest
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .put(
                    environment.baseURL + Api.user_change_password,
                    changePasswordRequest
                )
                .subscribe({
                    next: (res: { message: string }) => {
                        if (res.message == 'Password updated successfully') {
                            resolve(res.message);
                        } else {
                            reject(res.message);
                        }
                    },
                    error: (err: HttpErrorResponse) => {
                        reject(err.error.message);
                    },
                });
        });
    }

    verifyOTPForPatientDelete(
        id: number,
        email: string,
        otp: string
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .get(
                    this.baseURL +
                        Api.verify_otp_for_delete_patient +
                        '/' +
                        id +
                        '/' +
                        email +
                        '/' +
                        otp,
                    {}
                )
                .subscribe({
                    next: (res: { message: string }) => {
                        if (res.message == 'Patient Removed Successfully') {
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

    verifyOTPForAddConsentRequest(email: string, otp: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .post(this.baseURL + Api.user_add_consent, {
                    username: email,
                    otpNumber: otp,
                })
                .subscribe({
                    next: (res: { message: string }) => {
                        if (res.message == 'Consent added successfully') {
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

    changeUserPasswrod(
        changePasswordRequest: ChangePasswordRequest
    ): Observable<string> {
        return this.httpClient
            .put<string>(
                environment.baseURL + Api.user_change_password,
                changePasswordRequest
            )
            .pipe(
                catchError((error: any) => {
                    console.error('An error occurred:', error);
                    throw 'Error occurred while toggling receptionist status';
                })
            );
    }

    changeProfileImage(image: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .put<string>(environment.baseURL + Api.user_change_profile_picture, {
                    profilePic: image,
                })
                .subscribe({
                    next: (response: string) => {
                        resolve(response);
                    },
                    error: (error: any) => {
                        console.error('An error occurred:', error);
                        reject('Error occurred while changing profile image');
                    },
                });
        });
    }    
}
