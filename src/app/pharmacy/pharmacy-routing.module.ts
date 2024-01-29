import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PharmacyLoginComponent } from './pharmacy-login/pharmacy-login.component';
import { PharmacyAboutComponent } from './pharmacy-about/pharmacy-about.component';
import { PharmacyContactUsComponent } from './pharmacy-contact-us/pharmacy-contact-us.component';
import { PharmacyComponent } from './pharmacy.component';

const routes: Routes = [
    {
        path: '',
        component: PharmacyComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: PharmacyLoginComponent },
            { path: 'about', component: PharmacyAboutComponent },
            { path: 'contact_us', component: PharmacyContactUsComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PharmacyRoutingModule {}
