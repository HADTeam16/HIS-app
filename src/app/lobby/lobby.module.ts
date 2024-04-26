import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LobbyRoutingModule } from './lobby-routing.module';
import { LobbyComponent } from './lobby.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
<<<<<<< HEAD
import { ForgetPasswordComponent } from './login/forget-password/forget-password-dialog.component'
=======
import { ForgetPasswordComponent } from './login/password-reset/forget-password-dialog.component'
>>>>>>> e2cbd71e6213691e11fe4db3466fd74e9c78544f

@NgModule({
    declarations: [
        LobbyComponent,
        LoginComponent,
        AboutComponent,
        ContactUsComponent,
        ForgetPasswordComponent
    ],
    imports: [
        CommonModule,
        LobbyRoutingModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    providers: [
    ]
})
export class LobbyModule {}
