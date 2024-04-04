import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../services/admin.service';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../material/material.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DoctorDialogComponent } from './doctor-dialog/doctor-dialog.component';
import { NurseDialogComponent } from './nurse-dialog/nurse-dialog.component';
import { ReceptionistDialogComponent } from './receptionist-dialog/receptionist-dialog.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { EditDoctorDetailsComponent } from './edit-doctor-details/edit-doctor-details.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EditNurseDetailsComponent } from './edit-nurse-details/edit-nurse-details.component';
import { EditReceptionistDetailsComponent } from './edit-receptionist-details/edit-receptionist-details.component';


@NgModule({
  declarations: [
    AdminComponent,
    DoctorDialogComponent,
    NurseDialogComponent,
    ReceptionistDialogComponent,
    SearchInputComponent,
    AddDialogComponent,
    EditDoctorDetailsComponent,
    EditDialogComponent,
    EditNurseDetailsComponent,
    EditReceptionistDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatCheckboxModule,
  ],
  providers: [AdminService],
})
export class AdminModule { }
