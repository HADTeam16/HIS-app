import { Component } from '@angular/core';
import { HospitalInfoService } from '../../services/hospital-info.service';
import { HospitalStats } from '../../models/hospital-stats';
import { SnackbarService } from '../../../material/services/snackbar.service';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrl: './statistics.component.scss',
})
export class StatisticsComponent {
    isLoading: boolean;
    stats: HospitalStats;

    constructor(
        private hospitalInfoService: HospitalInfoService,
        private snackbarService: SnackbarService
    ) {
        this.isLoading = true;
        this.hospitalInfoService
            .getHospitalStats()
            .then(
                (res) => {
                    this.stats = res;
                },
                (err) => {
                    this.snackbarService.openSnackBar(err);
                }
            )
            .finally(() => {
                this.isLoading = false;
            });
    }
}
