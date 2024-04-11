import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import {
    Validators,
    FormBuilder,
    EmailValidator,
    FormControl,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import { SnackbarService } from '../../material/services/snackbar.service';
import { MobileotpValidator } from '../validators/mobile-otp.validator';
import { EmailotpValidator } from '../validators/email-otp.validator';
import { OtpService } from '../../services/otp.service';
import { ReceptionistService } from '../../services/receptionist.service';
import { PatientRegistration } from '../../models/user';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-patient',
    templateUrl: './add-patient.component.html',
    styleUrl: './add-patient.component.scss',
})
export class AddPatientComponent {
    personalDetailsFormGroup = this._formBuilder.group({
        firstName: ['', Validators.required],
        middleName: [''],
        lastName: [''],
        dateOfBirth: ['', Validators.required],
        gender: ['', Validators.required],
        profilePicture: ['', Validators.required],
    });
    addressDetailsFormGroup = this._formBuilder.group({
        addressLine1: ['', Validators.required],
        addressLine2: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        landmark: [''],
        pinCode: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
    });
    contactDetailsFormGroup = this._formBuilder.group({
        mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
        mobile_otp: [
            '',
            [Validators.required, Validators.pattern('[0-9]{6}')],
            this.mobileOtpValidator.validate.bind(this.mobileOtpValidator),
        ],
        email: ['', [Validators.required, Validators.email]],
        email_otp: [
            '',
            [Validators.required, Validators.pattern('[0-9]{6}')],
            this.emailOtpValidator.validate.bind(this.emailOtpValidator),
        ],
        emergencyContactName: [''],
        emergencyContactNumber: [''],
    });
    patientDetailsFormGroup = this._formBuilder.group({
        temperature: [0],
        bloodPressure: [''],
        height: [0],
        weight: [0],
    });
    stepperOrientation: Observable<StepperOrientation>;
    showOtpField = [false, false];
    showVerified = [false, false];

    constructor(
        private _formBuilder: FormBuilder,
        breakpointObserver: BreakpointObserver,
        private receptionistService: ReceptionistService,
        private snackbarService: SnackbarService,
        private otpService: OtpService,
        private mobileOtpValidator: MobileotpValidator,
        private emailOtpValidator: EmailotpValidator,
        private router: Router
    ) {
        this.stepperOrientation = breakpointObserver
            .observe('(min-width: 800px)')
            .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
        this.contactDetailsFormGroup.get('mobile_otp').statusChanges.subscribe({
            next: (stat) => {
                if (stat == 'VALID') {
                    this.contactDetailsFormGroup.get('mobile_otp').disable();
                    this.showVerified[0] = true;
                }
            },
        });
        this.contactDetailsFormGroup.get('email_otp').statusChanges.subscribe({
            next: (stat) => {
                if (stat == 'VALID') {
                    this.contactDetailsFormGroup.get('email_otp').disable();
                    this.showVerified[1] = true;
                }
            },
        });
    }

    registerPatient() {
        const personalDetails = this.personalDetailsFormGroup.getRawValue();
        const addressDetails = this.addressDetailsFormGroup.getRawValue();
        const contactDetails = this.contactDetailsFormGroup.getRawValue();
        const patientDetails = this.patientDetailsFormGroup.getRawValue();
        const patient: PatientRegistration = {
            firstName: personalDetails.firstName,
            middleName: personalDetails.middleName,
            lastName: personalDetails.lastName,
            gender: personalDetails.gender,
            dateOfBirth: personalDetails.dateOfBirth,
            profilePicture: personalDetails.profilePicture,
            addressLine1: addressDetails.addressLine1,
            addressLine2: addressDetails.addressLine2,
            city: addressDetails.city,
            state: addressDetails.state,
            country: addressDetails.country,
            landmark: addressDetails.landmark,
            pinCode: addressDetails.pinCode,
            contact: contactDetails.mobile,
            email: contactDetails.email,
            emergencyContactName: contactDetails.emergencyContactName,
            emergencyContactNumber: contactDetails.emergencyContactNumber,
            temperature: patientDetails.temperature,
            bloodPressure: patientDetails.bloodPressure,
            height: patientDetails.height,
            weight: patientDetails.weight,
            role: 'patient',
        };
        this.receptionistService.registerPatient(patient).subscribe({
            next: (res: { token: string; message: string; user: {} }) => {
                this.snackbarService.openSnackBar(res.message);
                this.router.navigate(['/receptionist']);
            },
            error: (error) => {
                this.snackbarService.openSnackBar(error);
            },
        });
    }

    onProfilePicUpload(pic: string) {
        this.personalDetailsFormGroup.controls.profilePicture.setValue(pic);
        this.snackbarService.openSnackBar('Profile picture uploaded');
    }

    sendMobileOtp() {
        const mobileField: FormControl =
            this.contactDetailsFormGroup.controls.mobile;
        if (mobileField.valid) {
            this.otpService.getMobileOtp('+91' + mobileField.value);
            this.showOtpField[0] = true;
        }
    }

    sendEmailOtp() {
        const emailField: FormControl =
            this.contactDetailsFormGroup.controls.email;
        if (emailField.valid) {
            this.otpService.getEmailOtp(emailField.value);
            this.showOtpField[1] = true;
        }
    }

    getTodaysDate() {
        return new Date();
    }
}
