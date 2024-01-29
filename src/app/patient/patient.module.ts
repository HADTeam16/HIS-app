import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { PatientAboutComponent } from './patient-about/patient-about.component';
import { PatientContactUsComponent } from './patient-contact-us/patient-contact-us.component';
import { PatientComponent } from './patient.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
    declarations: [
        PatientLoginComponent,
        PatientAboutComponent,
        PatientContactUsComponent,
        PatientComponent,
    ],
    imports: [CommonModule, PatientRoutingModule, MaterialModule],
})
export class PatientModule {}
