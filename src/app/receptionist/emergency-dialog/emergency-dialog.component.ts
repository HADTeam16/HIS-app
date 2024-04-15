import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OT } from '../../shared/models/ot';
import { ReceptionistService } from '../receptionist.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-emergency-dialog',
    templateUrl: './emergency-dialog.component.html',
})
export class EmergencyDialogComponent {
    selectedOT: OT;
    ots: OT[] = [];
    availableSurgeons: {
        id: number;
        specialization: string;
        first_name: string;
        last_name: string;
    }[] = [];
    otDataSubscription: Subscription;
    availableSurgeonsSubscription: Subscription;
    constructor(
        public dialogRef: MatDialogRef<EmergencyDialogComponent>,
        private receptionistService: ReceptionistService
    ) {
        Promise.all([
            new Promise((resolve, reject) => {
                this.otDataSubscription = this.receptionistService
                    .getAllOTData()
                    .subscribe({
                        next: (res: OT[]) => {
                            resolve(res);
                        },
                        error: (error) => {
                            reject(error);
                        },
                    });
            }),
            new Promise((resolve, reject) => {
                this.availableSurgeonsSubscription = this.receptionistService
                    .getAvailableSurgeons()
                    .subscribe({
                        next: (
                            res: {
                                id: number;
                                specialization: string;
                                first_name: string;
                                last_name: string;
                            }[]
                        ) => {
                            resolve(res);
                        },
                        error: (error) => {
                            reject(error);
                        },
                    });
            }),
        ]).then(
            (res) => {
                console.log('Promise response - ', res);
                this.ots = res[0] as OT[];
                this.availableSurgeons = res[1] as {
                    id: number;
                    first_name: string;
                    last_name: string;
                    specialization: string;
                }[];
            },
            (err) => {
                console.log('Promise error - ', err);
            }
        );
    }

    bookOT(ot_id: number) {
        // this.receptionistService.bookOT(ot_id, []);
    }

    clearOT(ot_id: number) {
        this.receptionistService.clearOT(ot_id);
    }

    selectOT(ot: OT) {
        this.selectedOT = ot;
    }

    ngOnDestroy() {
        this.otDataSubscription.unsubscribe();
        this.availableSurgeonsSubscription.unsubscribe();
    }
}
