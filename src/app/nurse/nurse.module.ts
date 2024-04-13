import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NurseRoutingModule } from './nurse-routing.module';
import { NurseComponent } from './nurse.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { MaterialModule } from '../material/material.module';
import { EditDetailsDialogComponent } from './appointments/edit-details-dialog/edit-details-dialog.component';
import { FormsModule } from '@angular/forms';
import { AssignWardComponent } from './assign-ward/assign-ward.component';
import { AllocateWardDialogComponent } from './assign-ward/allocate-ward-dialog/allocate-ward-dialog.component';
import { NurseService } from './nurse.service';

@NgModule({
    declarations: [
        NurseComponent,
        AppointmentsComponent,
        EditDetailsDialogComponent,
        AssignWardComponent,
        AllocateWardDialogComponent,
    ],
    imports: [
        CommonModule,
        NurseRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [NurseService],
})
export class NurseModule {}
