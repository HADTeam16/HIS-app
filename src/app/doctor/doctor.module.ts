import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { MaterialModule } from '../material/material.module';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PrecriptionDialogComponent } from './appointments/precription-dialog/precription-dialog.component';
import { WardDetailDialogComponent } from './ward-map/ward-detail-dialog/ward-detail-dialog.component';
import { WardMapComponent } from './ward-map/ward-map.component';

@NgModule({
    declarations: [
        DoctorComponent,
        AppointmentsComponent,
        PrecriptionDialogComponent,
        WardMapComponent,
        WardDetailDialogComponent
    ],
    imports: [CommonModule, DoctorRoutingModule, MaterialModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DoctorModule {}