import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { SnackbarService } from '../../material/services/snackbar.service';

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
        pinCode: ['', Validators.required],
    });
    contactDetailsFormGroup = this._formBuilder.group({
        contact: [''],
        email: [''],
        emergencyContactName: [''],
        emergencyContactNumber: [''],
    });
    patientDetailsFormGroup = this._formBuilder.group({
        temperature: [0],
        bloodPressure: [0],
        height: [0],
        weight: [0],
    });
    stepperOrientation: Observable<StepperOrientation>;

    constructor(
        private _formBuilder: FormBuilder,
        breakpointObserver: BreakpointObserver,
        private snackbarService: SnackbarService
    ) {
        this.stepperOrientation = breakpointObserver
            .observe('(min-width: 800px)')
            .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    }

    onProfilePicUpload(pic: string) {
        this.personalDetailsFormGroup.controls.profilePicture.setValue(pic);
        this.snackbarService.openSnackBar('Profile picture uploaded');
    }
    
    getTodaysDate() {
        return new Date();
    }
}
