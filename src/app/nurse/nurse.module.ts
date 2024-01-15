import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NurseRoutingModule } from './nurse-routing.module';
import { NurseComponent } from './nurse.component';


@NgModule({
  declarations: [
    NurseComponent
  ],
  imports: [
    CommonModule,
    NurseRoutingModule
  ]
})
export class NurseModule { }
