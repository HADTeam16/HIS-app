import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LobbyRoutingModule } from './lobby-routing.module';
import { LobbyComponent } from './lobby.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRippleModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
        MatToolbarModule,
        MatIconModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
        ReactiveFormsModule,
        MatButtonModule,
    ],
})
export class LobbyModule {}
