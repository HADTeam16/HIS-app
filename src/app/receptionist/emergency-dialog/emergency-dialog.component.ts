import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OT } from '../../shared/models/ot';
import { ReceptionistService } from '../receptionist.service';
import { FormControl } from '@angular/forms';

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
    surgeonsControl = new FormControl<number[]>([]);

    constructor(
        public dialogRef: MatDialogRef<EmergencyDialogComponent>,
        private receptionistService: ReceptionistService
    ) {
        Promise.all([
            this.receptionistService.getAllOTData(),
            this.receptionistService.getAvailableSurgeons(),
        ]).then(
            (res) => {
                this.ots = res[0] as OT[];
                this.availableSurgeons = res[1] as {
                    id: number;
                    first_name: string;
                    last_name: string;
                    specialization: string;
                }[];
            },
            (err) => {
                dialogRef.close(err);
            }
        );
    }

    bookOT(ot_id: number) {
        this.receptionistService
            .bookOT(ot_id, this.surgeonsControl.getRawValue())
            .then(
                (res: string) => {
                    this.dialogRef.close(res);
                },
                (error: string) => {
                    this.dialogRef.close(error);
                }
            );
    }

    clearOT(ot_id: number) {
        this.receptionistService.clearOT(ot_id).then(
            (res) => {
                this.dialogRef.close(res);
            },
            (error) => {
                this.dialogRef.close(error);
            }
        );
    }

    selectOT(ot: OT) {
        this.surgeonsControl.reset();
        this.selectedOT = ot;
    }
}
