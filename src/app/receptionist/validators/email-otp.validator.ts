import { Injectable } from '@angular/core';
import {
    AbstractControl,
    AsyncValidator,
    ValidationErrors,
} from '@angular/forms';
import { OtpService } from '../../services/otp.service';

@Injectable()
export class EmailotpValidator implements AsyncValidator {
    constructor(private otpService: OtpService) {}
    validate(control: AbstractControl): Promise<ValidationErrors | null> {
        const email = control.parent.get('email').value;
        return this.otpService.verifyEmailOtp(email, control.value);
    }
}
