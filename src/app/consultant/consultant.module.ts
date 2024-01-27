import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultantRoutingModule } from './consultant-routing.module';

import { ConsultantComponent } from './consultant.component';
import { WardMapComponent } from './ward-map/ward-map.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { WardDetailDialogComponent } from './ward-map/ward-detail-dialog/ward-detail-dialog.component';
import { PrecriptionDialogComponent } from './appointments/precription-dialog/precription-dialog.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
    declarations: [
        ConsultantComponent,
        WardMapComponent,
        AppointmentsComponent,
        WardDetailDialogComponent,
        PrecriptionDialogComponent,
    ],
    imports: [
        CommonModule,
        ConsultantRoutingModule,
        MaterialModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConsultantModule {}
