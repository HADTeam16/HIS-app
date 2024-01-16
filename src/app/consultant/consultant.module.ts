import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultantRoutingModule } from './consultant-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ConsultantComponent } from './consultant.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ForumComponent } from './forum/forum.component';

@NgModule({
    declarations: [ConsultantComponent, AppointmentsComponent, ForumComponent],
    imports: [
        CommonModule,
        RouterModule,
        ConsultantRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
    ],
})
export class ConsultantModule {}
