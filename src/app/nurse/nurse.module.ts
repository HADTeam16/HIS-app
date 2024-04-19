import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NurseRoutingModule } from './nurse-routing.module';
import { NurseComponent } from './nurse.component';
import { InPatientListComponent } from './in-patient-list/in-patient-list.component';
import { MaterialModule } from '../material/material.module';
import { EditDetailsDialogComponent } from './in-patient-list/edit-details-dialog/edit-details-dialog.component';
import { WardQueueComponent } from './ward-queue/ward-queue.component';
import { AllocateWardDialogComponent } from './ward-queue/allocate-ward-dialog/allocate-ward-dialog.component';
import { NurseService } from './nurse.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        NurseComponent,
        InPatientListComponent,
        EditDetailsDialogComponent,
        WardQueueComponent,
        AllocateWardDialogComponent,
    ],
    imports: [
        CommonModule,
        NurseRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    providers: [NurseService],
})
export class NurseModule {}
