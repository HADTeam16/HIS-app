import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Api } from '../enums/api';
import { ValidationErrors } from '@angular/forms';

@Injectable()
export class OtpService {
    constructor(private httpclient: HttpClient) {}

    getMobileOtp(mobile_number: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.httpclient
                .post(environment.baseURL + Api.get_mobile_otp, {
                    username: mobile_number,
                    phoneNumber: mobile_number,
                })
                .subscribe({
                    next: (res: { status: string; message: string }) => {
                        if (res.status == 'DELIVERED') {
                            resolve('Otp sent to number ' + mobile_number);
                        } else {
                            reject(res.status + ' : ' + res.message);
                        }
                    },
                    error: (err) => {
                        reject(err);
                    },
                });
        });
    }

    getEmailOtp(email: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.httpclient
                .post(environment.baseURL + Api.get_email_otp, {
                    username: email,
                    email,
                })
                .subscribe({
                    next: (res: { status: string; message: string }) => {
                        if (res.status == 'DELIVERED') {
                            resolve('Otp sent to email ' + email);
                        } else {
                            reject(res.status + ' : ' + res.message);
                        }
                    },
                    error: (err) => {
                        reject(err);
                    },
                });
        });
    }

    verifyOtp(
        username: string,
        otpNumber: string
    ): Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            if (otpNumber.length != 6) resolve({ invalidOtp: true });
            this.httpclient
                .post(environment.baseURL + Api.verify_otp, {
                    username,
                    otpNumber,
                })
                .subscribe({
                    next: (res: { message: string }) => {
                        switch (res.message) {
                            case 'OTP is valid':
                                resolve(null);
                                break;
                            case 'OTP has been expired':
                                resolve({ expired: true });
                                break;
                            case 'Invalid OTP':
                                resolve({ invalidOtp: true });
                                break;
                            case 'Access denied!':
                                resolve({ accessDenied: true });
                                break;
                            default:
                                resolve({ unknownError: true });
                                break;
                        }
                    },
                    error: (error) => {
                        resolve({ serverError: true });
                    },
                });
        });
    }
}
