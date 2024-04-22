import { Component ,Inject} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service'
import { Validators,FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../material/services/snackbar.service';

@Component({
    selector: 'app-forget-password-dialog',
    templateUrl: './forget-password-dialog.component.html'
})
export class ForgetPasswordComponent{

    forgetPasswordDetailsForm = new FormGroup({
        email: new FormControl<string>('',[Validators.required, Validators.email]),
        otp: new FormControl<string>('',[Validators.required,Validators.minLength(6),Validators.maxLength(6)]),
    });

    editPatientDetailsForm = new FormGroup({
        temperature: new FormControl<number>(null),
        bloodPressure: new FormControl<string>(''),
        heartRate: new FormControl<number>(null),
        weight: new FormControl<number>(null),
    });

    isLoading = false;
    showOtpField = false;
    constructor(
        private snackbarService: SnackbarService,
        private authService: AuthService,
         @Inject(MAT_DIALOG_DATA) public data: any
    ){}

    sendOTPForForgetPasswordRequest() {
        this.isLoading = true;
        this.authService
        .sendOTPForForgetPasswordRequest(this.forgetPasswordDetailsForm.getRawValue().email)
        .subscribe(res => {
            this.isLoading = false;
            this.snackbarService.openSnackBar(res["message"]);
            if (res["message"] === "Email Sent Successfully") {
                this.showOtpField = true;
            }
        }, error => {
            this.isLoading = false;
            this.snackbarService.openSnackBar(error);
        });
    }

    verifyOTPForForgetPasswordRequest() {
        this.authService
        .verifyOTPForForgetPasswordRequest(this.forgetPasswordDetailsForm.getRawValue().email,this.forgetPasswordDetailsForm.getRawValue().otp)
        .subscribe(res=>this.snackbarService.openSnackBar(res["message"]));
        this.isLoading = true;
    }

    
}