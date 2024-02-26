import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NurseComponent } from './nurse.component';
import { AppointmentsComponent } from './appointments/appointments.component';

const routes: Routes = [
  {
      path: '',
      component: NurseComponent,
      children: [
          { path: '', redirectTo: 'appointments', pathMatch: 'full' },
          { path: 'appointments', component: AppointmentsComponent },
      ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NurseRoutingModule { }
