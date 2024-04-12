import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { SnackbarService } from '../../material/services/snackbar.service';
import { MobileotpValidator } from '../validators/mobile-otp.validator';
import { EmailotpValidator } from '../validators/email-otp.validator';
import { OtpService } from '../../services/otp.service';
import { ReceptionistService } from '../../services/receptionist.service';
import { PatientRegistration } from '../../models/user';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
        dateOfBirth: [new Date('2000-01-01'), Validators.required],
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
        temperature: [],
        bloodPressure: ['', Validators.pattern('^[0-9]{1,3}/[0-9]{1,3}$')],
        height: [],
        weight: [],
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
            dateOfBirth: this.formatDateOfBirth(personalDetails.dateOfBirth),
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
            emergencyContactNumber:
                contactDetails.emergencyContactName.length > 0
                    ? contactDetails.emergencyContactNumber
                    : '',
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
            error: (error: HttpErrorResponse) => {
                this.snackbarService.openSnackBar(error.error.message);
            },
        });
    }

    onProfilePicUpload(pic: string) {
        this.personalDetailsFormGroup.controls.profilePicture.setValue(pic);
        this.snackbarService.openSnackBar('Profile picture uploaded');
    }

    sendMobileOtp() {
        this.otpService.getMobileOtp(
            '+91' + this.contactDetailsFormGroup.controls.mobile.value
        );
        this.showOtpField[0] = true;
    }

    sendEmailOtp() {
        this.otpService.getEmailOtp(
            this.contactDetailsFormGroup.controls.email.value
        );
        this.showOtpField[1] = true;
    }

    getTodaysDate() {
        return new Date();
    }

    formatDateOfBirth(dob: Date): string {
        return `${dob.getFullYear()}-${(dob.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${dob.getDate().toString().padStart(2, '0')}`;
    }
}
