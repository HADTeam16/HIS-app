import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElevateOnHoverDirective } from '../shared/directives/elevate-on-hover.directive';
import { FormatDateTimePipe } from '../shared/pipes/format-date-full.pipe';
import { AgePipe } from '../shared/pipes/age.pipe';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { HospitalInfoService } from './services/hospital-info.service';
import { MaterialModule } from '../material/material.module';

@NgModule({
    declarations: [
        ElevateOnHoverDirective,
        FormatDateTimePipe,
        AgePipe,
        StatisticsComponent,
    ],
    imports: [CommonModule, MaterialModule],
    exports: [
        StatisticsComponent,
        FormatDateTimePipe,
        AgePipe,
        ElevateOnHoverDirective,
        MaterialModule,
    ],
    providers: [HospitalInfoService],
})
export class SharedModule {}
