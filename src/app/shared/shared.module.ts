import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElevateOnHoverDirective } from '../shared/directives/elevate-on-hover.directive';
import { FormatDateTimePipe } from '../shared/pipes/format-date-full.pipe';
import { AgePipe } from '../shared/pipes/age.pipe';

@NgModule({
    declarations: [
        ElevateOnHoverDirective,
        FormatDateTimePipe,
        AgePipe,
    ],
    imports: [CommonModule],
    exports: [FormatDateTimePipe, AgePipe, ElevateOnHoverDirective],
})
export class SharedModule {}
