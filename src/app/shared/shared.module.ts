import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { FormatDateTimePipe } from '../shared/pipes/format-date-full.pipe';
import { AgePipe } from '../shared/pipes/age.pipe';
import { ElevateOnHoverDirective } from '../shared/directives/elevate-on-hover.directive';

import { StatisticsComponent } from './components/statistics/statistics.component';
import { ProfileComponent } from './components/profile/profile.component';

import { HospitalInfoService } from './services/hospital-info.service';
import { ChangePasswordDialogComponent } from './components/change-password-dialog/change-password-dialog.component';
import { ForgetPasswordComponent } from './components/otp-dialog/forget-password-dialog.component';
import { ConsentOtpDialogComponent } from './components/consent-otp-dialog/consent-otp-dialog.component';
import { DeletePatientOtpDialogComponent } from './components/delete-patient-otp-dialog/delete-patient-otp-dialog.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [
        ElevateOnHoverDirective,
        FormatDateTimePipe,
        AgePipe,
        StatisticsComponent,
        ProfileComponent,
        ChangePasswordDialogComponent,
        ForgetPasswordComponent,
        ConsentOtpDialogComponent,
        DeletePatientOtpDialogComponent,
    ],
    imports: [CommonModule, MaterialModule, MatInputModule],
    exports: [
        FormatDateTimePipe,
        AgePipe,
        ElevateOnHoverDirective,
        MaterialModule,
    ],
    providers: [HospitalInfoService],
})
export class SharedModule {}
