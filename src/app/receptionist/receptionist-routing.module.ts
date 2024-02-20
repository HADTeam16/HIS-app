import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionistComponent } from './receptionist.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { PatientsComponent } from './patients/patients.component';

const routes: Routes = [
    {
        path: '',
        component: ReceptionistComponent,
        children: [
            { path: '', redirectTo: 'patients', pathMatch: 'full' },
            { path: 'patients', component: PatientsComponent },
            { path: 'add-patient', component: AddPatientComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReceptionistRoutingModule {}