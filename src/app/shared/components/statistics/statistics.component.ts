import { Component } from '@angular/core';
import { HospitalInfoService } from '../../services/hospital-info.service';
import { HospitalStats } from '../../models/hospital-stats';
import { SnackbarService } from '../../../material/services/snackbar.service';
import {
    BehaviorSubject,
    defaultIfEmpty,
    map,
    Observable,
    Subject,
} from 'rxjs';
import { ChartConfiguration } from 'chart.js';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrl: './statistics.component.scss',
})
export class StatisticsComponent {
    isLoading: boolean;
    role: string = 'unknown';
    stats: BehaviorSubject<HospitalStats> = new BehaviorSubject(
        new HospitalStats()
    );

    constructor(
        private hospitalInfoService: HospitalInfoService,
        private snackbarService: SnackbarService,
        private authService: AuthService
    ) {
        this.isLoading = true;
        Promise.all([
            new Promise<string>((resolve, reject) => {
                this.authService.user.subscribe({
                    next: (res) => {
                        if (res) resolve(res.role);
                        else reject('User role unknown!');
                    },
                });
            }),
            this.hospitalInfoService.getHospitalStats(),
        ])
            .then(
                (res) => {
                    this.role = res[0];
                    this.stats.next(res[1]);
                },
                (err) => {
                    this.snackbarService.openSnackBar(err);
                }
            )
            .finally(() => {
                this.isLoading = false;
            });
    }

    getSpecialitywiseAvailableDoctors(): Observable<
        ChartConfiguration['data']
    > {
        return this.stats.pipe(
            map((res) => {
                if (
                    res.currentlyAvailableSpecialityWiseDoctorsCount == null ||
                    Object.entries(res).length <= 0
                )
                    return { datasets: [], labels: [] };
                return {
                    datasets: [
                        {
                            data: Object.values(
                                res.currentlyAvailableSpecialityWiseDoctorsCount
                            ),
                        },
                    ],
                    labels: Object.keys(
                        res.currentlyAvailableSpecialityWiseDoctorsCount
                    ),
                };
            })
        );
    }

    getSpecialitywiseAllDoctors(): Observable<ChartConfiguration['data']> {
        return this.stats.pipe(
            map((res): ChartConfiguration['data'] => {
                if (Object.entries(res).length > 0) {
                    return {
                        datasets: [
                            {
                                data: Object.values(
                                    res.specialityWiseDoctorsCount
                                ),
                            },
                        ],
                        labels: Object.keys(res.specialityWiseDoctorsCount),
                    };
                } else {
                    return {
                        datasets: [],
                        labels: [],
                    };
                }
            })
        );
    }

    getBarGraphData(): Observable<ChartConfiguration['data']> {
        return this.stats.pipe(
            map((res) => {
                if (Object.entries(res).length <= 0)
                    return { datasets: [], labels: [] };
                const available = [];
                const total = [];
                available.push(res.availableWards);
                available.push(res.otsAvailable);
                total.push(res.totalWards, res.totalOts);
                return {
                    datasets: [
                        { data: available, label: 'Available' },
                        { data: total, label: 'Total' },
                    ],
                    labels: ['Wards', 'OTs'],
                };
            })
        );
    }
}
