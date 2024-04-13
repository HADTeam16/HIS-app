import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'lobby', pathMatch: 'full' },
    {
        path: 'lobby',
        loadChildren: () =>
            import('./lobby/lobby.module').then((m) => m.LobbyModule),
    },
    {
        path: 'doctor',
        canActivate: [authGuard],
        loadChildren: () =>
            import('./doctor/doctor.module').then((m) => m.DoctorModule),
    },
    {
        path: 'receptionist',
        canActivate: [authGuard],
        loadChildren: () =>
            import('./receptionist/receptionist.module').then(
                (m) => m.ReceptionistModule
            ),
    },
    {
        path: 'nurse',
        canActivate: [authGuard],
        loadChildren: () =>
            import('./nurse/nurse.module').then((m) => m.NurseModule),
    },
    {
        path: 'admin',
        canActivate: [authGuard],
        loadChildren: () =>
            import('./admin/admin.module').then((m) => m.AdminModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
