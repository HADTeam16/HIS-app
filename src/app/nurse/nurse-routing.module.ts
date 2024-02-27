import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NurseComponent } from './nurse.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AssignWardComponent } from './assign-ward/assign-ward.component';

const routes: Routes = [
  {
      path: '',
      component: NurseComponent,
      children: [
          { path: '', redirectTo: 'appointments', pathMatch: 'full' },
          { path: 'appointments', component: AppointmentsComponent },
          { path: 'assign_ward', component: AssignWardComponent },
      ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NurseRoutingModule { }
