import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from '../../shared/models/user';
import { NeedWard } from '../../shared/models/ward';
import { Subscription } from 'rxjs';
import { SnackbarService } from '../../material/services/snackbar.service';
import { NurseService } from '../nurse.service';
import { AllocateWardDialogComponent } from './allocate-ward-dialog/allocate-ward-dialog.component';

@Component({
    selector: 'app-assign-ward',
    templateUrl: './assign-ward.component.html',
    styleUrl: './assign-ward.component.scss',
})
export class AssignWardComponent {
    isLoading = false;
    tableHeaders = ['id', 'firstName', 'lastName', 'gender'];
    headerAlias = {
        id: 'Patient ID',
        firstName: 'First name',
        lastName: 'Last name',
        gender: 'gender',
    };
    patientsWhoNeedWard: NeedWard[] = [];
    getPatientsWhoNeedWardSub: Subscription;
    constructor(
        private dialog: MatDialog,
        private snackbarService: SnackbarService,
        private nurseService: NurseService
    ) {}

    ngOnInit(): void {
        this.getPatientsWhoNeedWard();
    }

    getPatientsWhoNeedWard(): void {
        this.getPatientsWhoNeedWardSub = this.nurseService
            .getPatientsWhoNeedsWards()
            .subscribe({
                next: (needWard: NeedWard[]) => {
                    this.patientsWhoNeedWard = needWard;
                    console.log("Patients who need ward:", this.patientsWhoNeedWard);
                },
                error: (error) => {
                    console.error('Error fetching patients who need ward:', error);
                },
            });
    }    

    openAllocateWardDialog(needWardId: number): void {
        console.log('HIII');
        console.log('needWardId - ' + needWardId);
        const dialogRef = this.dialog.open(AllocateWardDialogComponent, {
            data: { needWardId },
        });

        dialogRef.afterClosed().subscribe((result) => {
            // Handle any actions after the dialog is closed, if needed
        });
    }

    ngOnDestroy(): void {
        if (this.getPatientsWhoNeedWardSub) {
            this.getPatientsWhoNeedWardSub.unsubscribe();
        }
    }

    getFullAddress(patient: Patient) {
        return (
            patient.addressLine1 +
            ', ' +
            patient.addressLine2 +
            ', ' +
            patient.city +
            ', ' +
            patient.state +
            ', ' +
            patient.country
        );
    }
}
