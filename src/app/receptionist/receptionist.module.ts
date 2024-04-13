import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionistRoutingModule } from './receptionist-routing.module';
import { ReceptionistComponent } from './receptionist.component';
import { MaterialModule } from '../material/material.module';
import { PatientsComponent } from './patients/patients.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReceptionistService } from './receptionist.service';
import { BookAppointmentDialogComponent } from './patients/book-appointment-dialog/book-appointment-dialog.component';
import { EmergencyDialogComponent } from './emergency-dialog/emergency-dialog.component';
import { MobileotpValidator } from './validators/mobile-otp.validator';
import { EmailotpValidator } from './validators/email-otp.validator';

@NgModule({
    declarations: [
        ReceptionistComponent,
        PatientsComponent,
        AddPatientComponent,
        BookAppointmentDialogComponent,
        EmergencyDialogComponent,
    ],
    imports: [
        CommonModule,
        ReceptionistRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    providers: [ReceptionistService, MobileotpValidator, EmailotpValidator],
})
export class ReceptionistModule {}
