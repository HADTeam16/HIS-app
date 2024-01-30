import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WardMapComponent } from './ward-map/ward-map.component';
import { ConsultantComponent } from './consultant.component';
import { AppointmentsComponent } from './appointments/appointments.component';

const routes: Routes = [
    {
        path: '',
        component: ConsultantComponent,
        children: [
            { path: '', redirectTo: 'ward_map', pathMatch: 'full' },
            { path: 'ward_map', component: WardMapComponent },
            { path: 'appointments', component: AppointmentsComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ConsultantRoutingModule {}
