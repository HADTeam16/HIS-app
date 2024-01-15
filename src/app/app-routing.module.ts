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
    {
        path: 'reception',
        loadChildren: () =>
            import('./reception/reception.module').then(
                (m) => m.ReceptionModule
            ),
    },
    {
        path: 'patient',
        loadChildren: () =>
            import('./patient/patient.module').then((m) => m.PatientModule),
    },
    {
        path: 'admin',
        loadChildren: () =>
            import('./admin/admin.module').then((m) => m.AdminModule),
    },
    {
        path: 'pharmacy',
        loadChildren: () =>
            import('./pharmacy/pharmacy.module').then((m) => m.PharmacyModule),
    },
    {
        path: 'nurse',
        loadChildren: () =>
            import('./nurse/nurse.module').then((m) => m.NurseModule),
    },
    {
        path: 'staff',
        loadChildren: () =>
            import('./staff/staff.module').then((m) => m.StaffModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
