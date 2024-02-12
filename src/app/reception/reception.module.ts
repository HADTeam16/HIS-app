import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionRoutingModule } from './reception-routing.module';
import { ReceptionComponent } from './reception.component';
import { MaterialModule } from '../material/material.module';
import { PatientsComponent } from './patients/patients.component';
import { AddPatientComponent } from './add-patient/add-patient.component';

@NgModule({
    declarations: [ReceptionComponent, PatientsComponent, AddPatientComponent],
    imports: [CommonModule, ReceptionRoutingModule, MaterialModule],
})
export class ReceptionModule {}
