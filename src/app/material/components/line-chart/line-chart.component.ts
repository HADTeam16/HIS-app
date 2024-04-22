import { Component, Input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import 'chartjs-adapter-date-fns';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrl: './line-chart.component.scss',
})
export class LineChartComponent {
    @Input() lineChartData:ChartConfiguration['data'];
    @Input() lineChartOptions: ChartConfiguration['options'];
}
