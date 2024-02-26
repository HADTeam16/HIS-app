import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NurseRoutingModule } from './nurse-routing.module';
import { NurseComponent } from './nurse.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { MaterialModule } from '../material/material.module';
import { EditDetailsDialogComponent } from './appointments/edit-details-dialog/edit-details-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NurseComponent,
    AppointmentsComponent,
    EditDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    NurseRoutingModule,
    MaterialModule,
    FormsModule,
  ]
})
export class NurseModule { }
