import { Injectable } from '@angular/core';
import {
    AbstractControl,
    AsyncValidator,
    ValidationErrors,
} from '@angular/forms';
import { OtpService } from '../../shared/services/otp.service';

@Injectable()
export class EmailotpValidator implements AsyncValidator {
    constructor(private otpService: OtpService) {}
    validate(control: AbstractControl): Promise<ValidationErrors | null> {
        const email = control.parent.get('email').value;
        return this.otpService.verifyOtp(email, control.value);
    }
}
