import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
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
    verifyMobileotp(
        mobile_number: string,
        otp: string
    ): Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            if (otp.length != 6) resolve({ invalidOtp: true });
            this.httpclient
                .post(environment.baseURL + Api.verify_mobile_otp, {
                    username: mobile_number,
                    otpNumber: otp,
                })
                .subscribe({
                    next: (res: { message: string }) => {
                        if (res.message == 'OTP is valid') {
                            resolve(null);
                        } else {
                            resolve({ invalidOtp: true });
                        }
                    },
                    error: (error) => {
                        resolve({ serverError: true });
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
    verifyEmailOtp(
        email: string,
        otp: string
    ): Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            if (otp.length != 6) resolve({ invalidOtp: true });
            this.httpclient
                .post(environment.baseURL + Api.verify_email_otp, {
                    username: email,
                    emailOtpNumber: otp,
                })
                .subscribe({
                    next: (res: { message: string }) => {
                        if (res.message == 'OTP is valid') {
                            resolve(null);
                        } else {
                            resolve({ invalidOtp: true });
                        }
                    },
                    error: (error) => {
                        console.log('Email error - ', error);
                        resolve({ serverError: true });
                    },
                });
        });
    }
}
