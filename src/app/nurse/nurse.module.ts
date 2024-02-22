import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NurseRoutingModule } from './nurse-routing.module';
import { NurseComponent } from './nurse.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    NurseComponent,
    AppointmentsComponent
  ],
  imports: [
    CommonModule,
    NurseRoutingModule,
    MaterialModule,
  ]
})
export class NurseModule { }
