import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElevateOnHoverDirective } from '../shared/directives/elevate-on-hover.directive';
import { FormatDateTimePipe } from '../shared/pipes/format-date-full.pipe';
import { AgePipe } from '../shared/pipes/age.pipe';
import { ProfileComponent } from './components/profile/profile.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@NgModule({
    declarations: [
        ElevateOnHoverDirective,
        FormatDateTimePipe,
        AgePipe,
        ProfileComponent,
    ],
    imports: [CommonModule, MatCardModule, MatListModule],
    exports: [FormatDateTimePipe, AgePipe, ElevateOnHoverDirective],
})
export class SharedModule {}
