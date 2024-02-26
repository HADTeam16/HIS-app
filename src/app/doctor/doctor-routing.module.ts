import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { WardMapComponent } from './ward-map/ward-map.component';

const routes: Routes = [
    {
        path: '',
        component: DoctorComponent,
        children: [
            { path: '', redirectTo: 'appointments', pathMatch: 'full' },
            { path: 'appointments', component: AppointmentsComponent },
            { path: 'ward_map', component: WardMapComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DoctorRoutingModule {}
