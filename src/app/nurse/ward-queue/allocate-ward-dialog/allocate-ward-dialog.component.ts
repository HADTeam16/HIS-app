import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../material/services/snackbar.service';
import { Subscription } from 'rxjs';
import { NurseService } from '../../nurse.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-allocate-ward-dialog',
    templateUrl: './allocate-ward-dialog.component.html',
    styleUrl: './allocate-ward-dialog.component.scss',
})
export class AllocateWardDialogComponent {
    needWardId: number;
    selectedWard = new FormControl<number>(null);
    availableWardIds: number[] = [];
    getAllAvailableWardsSub: Subscription;

    constructor(
        private dialogRef: MatDialogRef<AllocateWardDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private snackbarService: SnackbarService,
        private nurseService: NurseService
    ) {
        this.needWardId = data?.needWardId;
    }

    ngOnInit(): void {
        this.getAvailableWardIds();
    }

    getAvailableWardIds(): void {
        this.getAllAvailableWardsSub = this.nurseService
            .getAllAvailableWards()
            .subscribe({
                next: (wardIds: number[]) => {
                    this.availableWardIds = wardIds;
                },
                error: (error) => {
                    console.error('Error fetching nurse IDs:', error);
                },
            });
    }

    ngOnDestroy(): void {
        if (this.getAllAvailableWardsSub) {
            this.getAllAvailableWardsSub.unsubscribe();
        }
    }

    onAssignWard(): void {
        this.nurseService
            .assignWard(this.selectedWard.value, this.needWardId)
            .then(
                (res) => {
                    this.snackbarService.openSnackBar(res);
                    this.dialogRef.close('success');
                },
                (err) => {
                    this.snackbarService.openSnackBar(err);
                }
            );
    }
}
