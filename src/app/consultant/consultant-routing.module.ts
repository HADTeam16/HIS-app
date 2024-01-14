import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { WardMapComponent } from './ward-map/ward-map.component';
import { ConsultantComponent } from './consultant.component';
import { authGuard } from '../auth.guard';

const routes: Routes = [
    {
        path: '',
        component: ConsultantComponent,
        canActivateChild: [authGuard],
        children: [
            { path: '', redirectTo: 'ward_map', pathMatch: 'full' },
            { path: 'ward_map', component: WardMapComponent },
            { path: 'feed', component: FeedComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ConsultantRoutingModule {}
