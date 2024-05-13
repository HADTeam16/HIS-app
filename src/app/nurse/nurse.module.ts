import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NurseRoutingModule } from './nurse-routing.module';
import { NurseComponent } from './nurse.component';
import { InPatientListComponent } from './in-patient-list/in-patient-list.component';
import { EditDetailsDialogComponent } from './in-patient-list/edit-details-dialog/edit-details-dialog.component';
import { WardQueueComponent } from './ward-queue/ward-queue.component';
import { AllocateWardDialogComponent } from './ward-queue/allocate-ward-dialog/allocate-ward-dialog.component';
import { NurseService } from './nurse.service';
import { SharedModule } from '../shared/shared.module';
import { WardEmergencyDialogComponent } from './in-patient-list/ward-emergency-dialog/ward-emergency-dialog.component';
import { DoctorService } from '../doctor/doctor.service';

@NgModule({
    declarations: [
        NurseComponent,
        InPatientListComponent,
        EditDetailsDialogComponent,
        WardQueueComponent,
        AllocateWardDialogComponent,
        WardEmergencyDialogComponent,
    ],
    imports: [CommonModule, NurseRoutingModule, SharedModule],
    providers: [NurseService, DoctorService],
})
export class NurseModule {}
