import { Injectable } from '@angular/core';
import {
    AbstractControl,
    AsyncValidator,
    ValidationErrors,
} from '@angular/forms';
import { OtpService } from '../../services/otp.service';

@Injectable()
export class MobileotpValidator implements AsyncValidator {
    constructor(private otpService: OtpService) {}
    validate(control: AbstractControl): Promise<ValidationErrors | null> {
        const mobile_number = control.parent.get('mobile').value;
        return this.otpService.verifyOtp('+91' + mobile_number, control.value);
    }
}
