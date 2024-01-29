import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LobbyRoutingModule } from './lobby-routing.module';
import { LobbyComponent } from './lobby.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
    declarations: [
        LobbyComponent,
        LoginComponent,
        AboutComponent,
        ContactUsComponent,
    ],
    imports: [
        CommonModule,
        LobbyRoutingModule,
        ReactiveFormsModule,
        MaterialModule
    ],
})
export class LobbyModule {}
