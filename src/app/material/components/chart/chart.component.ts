import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartTypeRegistry } from 'chart.js';
import 'chartjs-adapter-date-fns';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
})
export class ChartComponent {
    @Input() type: keyof ChartTypeRegistry;
    @Input() chartData: ChartConfiguration['data'];
    @Input() chartOptions: ChartConfiguration['options'];
}
