import { ConsultantComponent } from './consultant.component';
import { WardMapComponent } from './ward-map/ward-map.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { FeedComponent } from './feed/feed.component';
import { ForumComponent } from './forum/forum.component';
import { WardDetailDialogComponent } from './ward-map/ward-detail-dialog/ward-detail-dialog.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultantRoutingModule } from './consultant-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
    declarations: [
        ConsultantComponent,
        WardMapComponent,
        AppointmentsComponent,
        FeedComponent,
        ForumComponent,
        WardDetailDialogComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        ConsultantRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatGridListModule,
        MatCardModule,
        MatDialogModule,
        MatDividerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatExpansionModule,
    ],
})
export class ConsultantModule {}
