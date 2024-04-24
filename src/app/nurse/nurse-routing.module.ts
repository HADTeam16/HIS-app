import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NurseComponent } from './nurse.component';
import { nurseGuard } from './nurse.guard';
import { InPatientListComponent } from './in-patient-list/in-patient-list.component';
import { WardQueueComponent } from './ward-queue/ward-queue.component';
import { ProfileComponent } from '../shared/components/profile/profile.component';

const routes: Routes = [
    {
        path: '',
        component: NurseComponent,
        children: [
            { path: '', redirectTo: 'in_patient_list', pathMatch: 'full' },
            { path: 'in_patient_list', component: InPatientListComponent },
            { path: 'my_profile', component: ProfileComponent },
            {
                path: 'ward_queue',
                component: WardQueueComponent,
                canActivate: [nurseGuard],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NurseRoutingModule {}
