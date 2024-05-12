import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WardDetailDialogComponent } from './ward-detail-dialog/ward-detail-dialog.component';
import { Ward } from '../../shared/models/ward';
import { DoctorService } from '../doctor.service';
import { FormControl } from '@angular/forms';
import { SnackbarService } from '../../material/services/snackbar.service';
import { BreakpointService } from '../../material/services/breakpoint.service';
import { Subscription } from 'rxjs';

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
    isTablet: boolean;
    bpsub: Subscription;

    constructor(
        private dialog: MatDialog,
        private doctorService: DoctorService,
        private snackbarService: SnackbarService,
        private breakPointService: BreakpointService
    ) {}

    ngOnInit() {
        this.bpsub = this.breakPointService.isTablet.subscribe((res) => {
            this.isTablet = res;
        });
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

    onSelectTile(ward: Ward) {
        if (ward.availableStatus) {
            this.snackbarService.openSnackBar('No details to show!');
        } else {
            this.openDialog(ward);
        }
    }

    openDialog(ward: Ward): void {
        this.dialog.open(WardDetailDialogComponent, {
            height: '95%',
            width: '75%',
            data: ward,
        });
    }

    ngOnDestroy() {
        this.bpsub.unsubscribe();
    }
}
