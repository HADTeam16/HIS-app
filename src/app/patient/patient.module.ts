import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { PatientAboutComponent } from './patient-about/patient-about.component';
import { PatientContactUsComponent } from './patient-contact-us/patient-contact-us.component';


@NgModule({
  declarations: [
    PatientLoginComponent,
    PatientAboutComponent,
    PatientContactUsComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule
  ]
})
export class PatientModule { }
