import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ward } from '../../../shared/models/ward';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { WardService } from '../../../shared/services/ward.service';
import { SnackbarService } from '../../../material/services/snackbar.service';
import { BreakpointService } from '../../../material/services/breakpoint.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-ward-detail-dialog',
    templateUrl: './ward-detail-dialog.component.html',
    styleUrl: './ward-detail-dialog.component.scss',
})
export class WardDetailDialogComponent {
    lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [],
                label: 'Daily Temperature',
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.3)',
            },
            {
                data: [],
                label: 'Daily Heart Rate',
                borderColor: 'green',
                backgroundColor: 'rgba(0, 255, 0, 0.3)',
            },
        ],
        labels: [],
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
                    parser: "yyyy-MM-dd'T'HH:mm:ss.SSSSSS",
                    tooltipFormat: 'yyyy-MM-dd HH:mm:ss',
                },
                title: {
                    display: true,
                    text: 'Log time',
                },
            },
        },
    };
    isTablet: boolean;
    bpsub: Subscription;

    constructor(
        @Inject(MAT_DIALOG_DATA) public ward: Ward,
        private wardService: WardService,
        private snackbarService: SnackbarService,
        private breakPointService: BreakpointService
    ) {}

    ngOnInit() {
        this.bpsub = this.breakPointService.isTablet.subscribe((res) => {
            this.isTablet = res;
        });
        this.wardService.getWardHistory(this.ward.wardId).then(
            (res) => {
                res.sort(
                    (a, b) =>
                        new Date(a.log).getTime() - new Date(b.log).getTime()
                );
                this.lineChartData.labels = [];
                this.lineChartData.datasets[0].data = [];
                this.lineChartData.datasets[1].data = [];
                res.forEach((entry) => {
                    this.lineChartData.labels.push(entry.log);
                    this.lineChartData.datasets[0].data.push(entry.temperature);
                    this.lineChartData.datasets[1].data.push(entry.heartRate);
                });
            },
            (err) => {
                this.snackbarService.openSnackBar(err);
            }
        );
    }

    getFullName(ward: Ward) {
        return (
            ward.firstName +
            (ward.middleName ? ' ' + ward.middleName : '') +
            (ward.lastName ? ' ' + ward.lastName : '')
        );
    }

    ngOnDestroy() {
        this.bpsub.unsubscribe();
    }
}
