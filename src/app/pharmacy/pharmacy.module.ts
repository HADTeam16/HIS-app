import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { PharmacyLoginComponent } from './pharmacy-login/pharmacy-login.component';
import { PharmacyAboutComponent } from './pharmacy-about/pharmacy-about.component';
import { PharmacyContactUsComponent } from './pharmacy-contact-us/pharmacy-contact-us.component';


@NgModule({
  declarations: [
    PharmacyLoginComponent,
    PharmacyAboutComponent,
    PharmacyContactUsComponent
  ],
  imports: [
    CommonModule,
    PharmacyRoutingModule
  ]
})
export class PharmacyModule { }
