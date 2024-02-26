import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'app-add-patient',
    templateUrl: './add-patient.component.html',
    styleUrl: './add-patient.component.scss',
})
export class AddPatientComponent {
    personalDetailsFormGroup = this._formBuilder.group({
        firstName: [''],
        middleName: [''],
        lastName: [''],
        dateOfBirth: [''],
        gender: [''],
        profilePicture: [''],
    });
    addressDetailsFormGroup = this._formBuilder.group({
        addressLine1: [''],
        addressLine2: [''],
        city: [''],
        state: [''],
        country: [''],
        landmark: [''],
        pinCode: [''],
    });
    contactDetailsFormGroup = this._formBuilder.group({
        contact: [''],
        email: [''],
        emergencyContactName: [''],
        emergencyContactNumber: [''],
    });
    patientDetailsFormGroup = this._formBuilder.group({
        purpose: [''],
        temperature: [''],
        bloodPressure: [''],
        admissionDate: [''],
        dischargeDate: [''],
    });
    stepperOrientation: Observable<StepperOrientation>;

    constructor(
        private _formBuilder: FormBuilder,
        breakpointObserver: BreakpointObserver
    ) {
        this.stepperOrientation = breakpointObserver
            .observe('(min-width: 800px)')
            .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    }
}
