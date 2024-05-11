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
@NgModule({
    declarations: [
        ElevateOnHoverDirective,
        FormatDateTimePipe,
        AgePipe,
        StatisticsComponent,
        ProfileComponent,
        ChangePasswordDialogComponent,
    ],
    imports: [CommonModule, MaterialModule],
    exports: [
        FormatDateTimePipe,
        AgePipe,
        ElevateOnHoverDirective,
        MaterialModule,
    ],
    providers: [HospitalInfoService],
})
export class SharedModule {}
