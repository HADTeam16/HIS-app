import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { PatientAboutComponent } from './patient-about/patient-about.component';
import { PatientContactUsComponent } from './patient-contact-us/patient-contact-us.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: PatientLoginComponent },
    { path: 'about', component: PatientAboutComponent },
    { path: 'contact_us', component: PatientContactUsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PatientRoutingModule {}
