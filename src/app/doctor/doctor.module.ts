import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { MaterialModule } from '../material/material.module';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PrescriptionDialogComponent } from './appointments/prescription-dialog/prescription-dialog.component';
import { WardDetailDialogComponent } from './ward-map/ward-detail-dialog/ward-detail-dialog.component';
import { WardMapComponent } from './ward-map/ward-map.component';
import { DoctorService } from './doctor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientHistoryDialogComponent } from './appointments/patient-history-dialog/patient-history-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { CancelAppointmentDialogComponent } from './appointments/cancel-appointment-dialog/cancel-appointment-dialog.component';

@NgModule({
    declarations: [
        DoctorComponent,
        AppointmentsComponent,
        PrescriptionDialogComponent,
        WardMapComponent,
        WardDetailDialogComponent,
        PatientHistoryDialogComponent,
        CancelAppointmentDialogComponent,
    ],
    imports: [
        CommonModule,
        DoctorRoutingModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [DoctorService],
})
export class DoctorModule {}
