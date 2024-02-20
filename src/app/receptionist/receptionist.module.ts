import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionistRoutingModule } from './receptionist-routing.module';
import { ReceptionistComponent } from './receptionist.component';
import { MaterialModule } from '../material/material.module';
import { PatientsComponent } from './patients/patients.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReceptionistService } from '../services/receptionist.service';

@NgModule({
    declarations: [
        ReceptionistComponent,
        PatientsComponent,
        AddPatientComponent,
    ],
    imports: [
        CommonModule,
        ReceptionistRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    providers: [ReceptionistService],
})
export class ReceptionistModule {}