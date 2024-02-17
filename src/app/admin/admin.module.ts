import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DoctorDialogComponent } from './doctor-dialog/doctor-dialog.component';
import { NurseDialogComponent } from './nurse-dialog/nurse-dialog.component';
import { ReceptionistDialogComponent } from './receptionist-dialog/receptionist-dialog.component';
import { PharmacyDialogComponent } from './pharmacy-dialog/pharmacy-dialog.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';


@NgModule({
  declarations: [
    AdminComponent,
    DoctorDialogComponent,
    NurseDialogComponent,
    ReceptionistDialogComponent,
    PharmacyDialogComponent,
    SearchInputComponent,
    AddDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class AdminModule { }
