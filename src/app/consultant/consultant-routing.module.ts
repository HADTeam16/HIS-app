import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WardMapComponent } from './ward-map/ward-map.component';
import { ConsultantComponent } from './consultant.component';
import { authGuard } from '../auth.guard';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ForumComponent } from './forum/forum.component';

const routes: Routes = [
    {
        path: '',
        component: ConsultantComponent,
        canActivateChild: [authGuard],
        children: [
            { path: '', redirectTo: 'ward_map', pathMatch: 'full' },
            { path: 'ward_map', component: WardMapComponent },
            { path: 'appointments', component: AppointmentsComponent },
            { path: 'forum', component: ForumComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ConsultantRoutingModule {}
