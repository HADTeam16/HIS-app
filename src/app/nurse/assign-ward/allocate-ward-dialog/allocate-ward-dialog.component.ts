import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Patient } from '../../../shared/models/user';
import { SnackbarService } from '../../../material/services/snackbar.service';
import { Subscription } from 'rxjs';
import { NurseService } from '../../nurse.service';

@Component({
    selector: 'app-allocate-ward-dialog',
    templateUrl: './allocate-ward-dialog.component.html',
    styleUrl: './allocate-ward-dialog.component.scss',
})
export class AllocateWardDialogComponent {
    needWardId: number;
    selectedWard: number;
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

    onAssignWard(wardId: number): void {
        this.nurseService.assignWard(wardId, this.needWardId).subscribe({
            next: (response) => {
                console.log('Ward assigned successfully:', response);
                this.snackbarService.openSnackBar('Ward assigned successfully');
            },
            error: (error) => {
                console.error('Error assigning ward:', error);
                this.snackbarService.openSnackBar('Error assigning ward');
            },
        });
    }
}
