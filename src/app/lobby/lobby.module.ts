import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LobbyRoutingModule } from './lobby-routing.module';
import { LobbyComponent } from './lobby.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { DoctorLoginComponent } from './login/doctor-login/doctor-login.component';
import { ForgetPasswordComponent } from '../shared/components/otp-dialog/forget-password-dialog.component';

@NgModule({
    declarations: [
        LobbyComponent,
        LoginComponent,
        AboutComponent,
        ContactUsComponent,
        ForgetPasswordComponent,
        DoctorLoginComponent,
    ],
    imports: [
        CommonModule,
        LobbyRoutingModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
    providers: [],
})
export class LobbyModule {}
