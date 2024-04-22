import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ward } from '../../../shared/models/ward';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
    selector: 'app-ward-detail-dialog',
    templateUrl: './ward-detail-dialog.component.html',
})
export class WardDetailDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public ward: Ward) {}
    lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [
                    36.7, 37.5, 38.2, 37.8, 37.0, 36.8, 36.5, 36.9, 37.2, 36.6,
                ],
                label: 'Daily Temperature',
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.3)',
            },
            {
                data: [72, 75, 78, 74, 71, 73, 70, 69, 68, 72],
                label: 'Daily Heart Rate',
                borderColor: 'green',
                backgroundColor: 'rgba(0, 255, 0, 0.3)',
            },
        ],
        labels: [
            '2024-04-10',
            '2024-04-11',
            '2024-04-12',
            '2024-04-13',
            '2024-04-14',
            '2024-04-15',
            '2024-04-16',
            '2024-04-17',
            '2024-04-18',
            '2024-04-19',
        ],
    };
    lineChartOptions: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: { display: true },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    tooltipFormat: 'yyyy-MM-dd',
                },
                title: {
                    display: true,
                    text: 'Date',
                },
            },
        },
    };

    getFullName(ward: Ward) {
        return (
            ward.firstName +
            (ward.middleName ? ' ' + ward.middleName : '') +
            (ward.lastName ? ' ' + ward.lastName : '')
        );
    }
}
