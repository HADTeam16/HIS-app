import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WardDetailDialogComponent } from './ward-detail-dialog/ward-detail-dialog.component';
import { Ward } from '../../shared/models/ward';
import { DoctorService } from '../doctor.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-ward-map',
    templateUrl: './ward-map.component.html',
})
export class WardMapComponent {
    floors: number[];
    allWards: {};
    selectedFloor: FormControl<number> = new FormControl(0);
    selectedFloorWards: Ward[];
    isLoading: boolean;

    constructor(
        private dialog: MatDialog,
        private doctorService: DoctorService
    ) {
        this.isLoading = true;
        this.selectedFloor.valueChanges.subscribe((res) => {
            this.selectedFloorWards = this.allWards[res];
        });
        this.doctorService
            .getWardsData()
            .then((res) => {
                this.floors = [
                    ...new Set(res.map((ward) => ward.floor)),
                ].sort();
                this.allWards = {};
                for (let i = 0; i < this.floors.length; i++) {
                    this.allWards[this.floors[i]] = res.filter(
                        (ward) => ward.floor && ward.floor == this.floors[i]
                    );
                }
                this.selectedFloor.setValue(this.floors[0]);
            })
            .finally(() => {
                this.isLoading = false;
            });
    }

    onFloorChange(floor: number) {
        console.log(floor);
        this.selectedFloorWards = this.allWards[floor];
    }

    openDialog(wardData: any): void {
        this.dialog.open(WardDetailDialogComponent, {
            height: '60%',
            width: '60%',
            data: wardData,
        });
    }

    getFullName(ward: Ward) {
        return (
            ward.firstName +
            (ward.middleName ? ' ' + ward.middleName : '') +
            (ward.lastName ? ' ' + ward.lastName : '')
        );
    }
}
