import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'lobby', pathMatch: 'full' },
    {
        path: 'lobby',
        loadChildren: () =>
            import('./lobby/lobby.module').then((m) => m.LobbyModule),
    },
    {
        path: 'consultant',
        loadChildren: () =>
            import('./consultant/consultant.module').then(
                (m) => m.ConsultantModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
