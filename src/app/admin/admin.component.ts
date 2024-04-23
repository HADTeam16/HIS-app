import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { AuthService } from '../shared/services/auth.service';
import { Doctor, Nurse, Receptionist } from '../shared/models/user';
import { AdminService } from './admin.service';
import { finalize } from 'rxjs';
import { SnackbarService } from '../material/services/snackbar.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
    isLoading = false;
    tableDoctorHeaders = [
        'id',
        'firstName',
        'lastName',
        'dateOfBirth',
        'email',
    ];
    tableNurseHeaders = ['id', 'firstName', 'lastName', 'dateOfBirth', 'email'];
    tableReceptionistHeaders = [
        'id',
        'firstName',
        'lastName',
        'dateOfBirth',
        'email',
    ];
    headerDoctorAlias = {
        id: 'User ID',
        firstName: 'First Name',
        lastName: 'Last Name',
        dateOfBirth: 'Date of Birth',
        email: 'Email',
    };
    headerNurseAlias = {
        id: 'User ID',
        firstName: 'First Name',
        lastName: 'Last Name',
        dateOfBirth: 'Date of Birth',
        email: 'Email',
    };
    headerReceptionistAlias = {
        id: 'User ID',
        firstName: 'First Name',
        lastName: 'Last Name',
        dateOfBirth: 'Date of Birth',
        email: 'Email',
    };

    tableDataDoctor: Doctor[] = [];
    tableDataNurse: Nurse[] = [];
    tableDataReceptionist: Receptionist[] = [];

    constructor(
        private authService: AuthService,
        public dialog: MatDialog,
        private adminService: AdminService,
        private snackbarService: SnackbarService
    ) {
        this.getDoctors();
        this.getNurses();
        this.getReceptionist();
    }

    selectedTabIndex = 0;

    getDoctors() {
        this.isLoading = true;
        this.adminService
            .getAllDoctors()
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                })
            )
            .subscribe({
                next: (response) => {
                    this.tableDataDoctor = response;
                },
                error: (error) => {
                    this.snackbarService.openSnackBar(error);
                },
            });
    }

    getNurses() {
        this.isLoading = true;
        this.adminService
            .getAllNurse()
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                })
            )
            .subscribe({
                next: (response) => {
                    this.tableDataNurse = response;
                },
                error: (error) => {
                    this.snackbarService.openSnackBar(error);
                },
            });
    }

    getReceptionist() {
        this.isLoading = true;
        this.adminService
            .getAllReceptionist()
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                })
            )
            .subscribe({
                next: (response) => {
                    this.tableDataReceptionist = response;
                },
                error: (error) => {
                    this.snackbarService.openSnackBar(error);
                },
            });
    }

    toggleDoctorStatus(doctor: Doctor): void {
        this.isLoading = true;
        this.adminService
            .toggleDoctorById(doctor.id)
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                })
            )
            .subscribe({
                next: (response) => {
                    let message;
                    if (typeof response === 'string') {
                        message = response;
                    } else {
                        message = 'Status changed successfully';
                    }
                    this.snackbarService.openSnackBar(message);
                    // Toggle the status in the local data
                    console.log('Before toggling:', this.tableDataDoctor);
                    const doctorIndex = this.tableDataDoctor.findIndex(
                        (el) => el.id === doctor.id
                    );
                    if (doctorIndex !== -1) {
                        this.tableDataDoctor[doctorIndex].disable =
                            !this.tableDataDoctor[doctorIndex].disable;
                    }
                    console.log('After toggling:', this.tableDataDoctor);
                },
                error: (error) => {
                    let errorMessage = 'An error occurred';
                    if (
                        error &&
                        error.error &&
                        typeof error.error === 'string'
                    ) {
                        errorMessage = error.error;
                    }
                    this.snackbarService.openSnackBar(errorMessage);
                    // Revert the UI changes if any
                    const doctorIndex = this.tableDataDoctor.findIndex(
                        (el) => el.id === doctor.id
                    );
                    if (doctorIndex !== -1) {
                        this.tableDataDoctor[doctorIndex].disable =
                            !this.tableDataDoctor[doctorIndex].disable;
                    }
                },
            });
    }

    onChangePasswordByAdmin(userId: number): void {
        this.isLoading = true;
        this.adminService
            .changeUserPasswordByIdByAdmin(userId)
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                })
            )
            .subscribe({
                next: (response) => {
                    let message;
                    if (typeof response === 'string') {
                        message = response;
                    } else {
                        message = 'Password changed successfully';
                    }
                    this.snackbarService.openSnackBar(message);
                },
                error: (error) => {
                    let errorMessage = 'An error occurred';
                    if (
                        error &&
                        error.error &&
                        typeof error.error === 'string'
                    ) {
                        errorMessage = error.error;
                    }
                    this.snackbarService.openSnackBar(errorMessage);
                },
            });
    }

    toggleNurseStatus(nurse: Nurse): void {
        this.isLoading = true;
        this.adminService
            .toggleNurseById(nurse.id)
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                })
            )
            .subscribe({
                next: (response) => {
                    let message;
                    if (typeof response === 'string') {
                        message = response;
                    } else {
                        message = 'Status changed successfully';
                    }
                    this.snackbarService.openSnackBar(message);
                    const nurseIndex = this.tableDataNurse.findIndex(
                        (el) => el.id === nurse.id
                    );
                    if (nurseIndex !== -1) {
                        this.tableDataNurse[nurseIndex].disable =
                            !this.tableDataNurse[nurseIndex].disable;
                    }
                },
                error: (error) => {
                    let errorMessage = 'An error occurred';
                    if (
                        error &&
                        error.error &&
                        typeof error.error === 'string'
                    ) {
                        errorMessage = error.error;
                    }
                    this.snackbarService.openSnackBar(errorMessage);
                    const nurseIndex = this.tableDataNurse.findIndex(
                        (el) => el.id === nurse.id
                    );
                    if (nurseIndex !== -1) {
                        this.tableDataNurse[nurseIndex].disable =
                            !this.tableDataNurse[nurseIndex].disable;
                    }
                },
            });
    }

    toggleReceptionistStatus(receptionist: Receptionist): void {
        this.isLoading = true;
        this.adminService
            .toggleReceptionistById(receptionist.id)
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                })
            )
            .subscribe({
                next: (response) => {
                    let message;
                    if (typeof response === 'string') {
                        message = response;
                    } else {
                        message = 'Status changed successfully';
                    }
                    this.snackbarService.openSnackBar(message);
                    const receptionistIndex =
                        this.tableDataReceptionist.findIndex(
                            (el) => el.id === receptionist.id
                        );
                    if (receptionistIndex !== -1) {
                        this.tableDataReceptionist[receptionistIndex].disable =
                            !this.tableDataReceptionist[receptionistIndex]
                                .disable;
                    }
                },
                error: (error) => {
                    let errorMessage = 'An error occurred';
                    if (
                        error &&
                        error.error &&
                        typeof error.error === 'string'
                    ) {
                        errorMessage = error.error;
                    }
                    this.snackbarService.openSnackBar(errorMessage);
                    const receptionistIndex =
                        this.tableDataReceptionist.findIndex(
                            (el) => el.id === receptionist.id
                        );
                    if (receptionistIndex !== -1) {
                        this.tableDataReceptionist[receptionistIndex].disable =
                            !this.tableDataReceptionist[receptionistIndex]
                                .disable;
                    }
                },
            });
    }

    onDoctorEdit(doctorId: number): void {
        const dialogRef = this.dialog.open(EditDialogComponent, {
            data: { tabIndex: this.selectedTabIndex, doctorId: doctorId },
        });

        dialogRef.afterClosed().subscribe((result) => {
            // Handle dialog closed if needed
        });
    }

    onNurseEdit(nurseId: number): void {
        const dialogRef = this.dialog.open(EditDialogComponent, {
            data: { tabIndex: this.selectedTabIndex, nurseId: nurseId },
        });

        dialogRef.afterClosed().subscribe((result) => {
            // Handle dialog closed if needed
        });
    }

    onReceptionistEdit(receptionistId: number): void {
        const dialogRef = this.dialog.open(EditDialogComponent, {
            data: {
                tabIndex: this.selectedTabIndex,
                receptionistId: receptionistId,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            // Handle dialog closed if needed
        });
    }

    openAddDialog() {
        const dialogRef = this.dialog.open(AddDialogComponent, {
            data: { tabIndex: this.selectedTabIndex },
        });

        dialogRef.afterClosed().subscribe((result) => {
            // Handle dialog closed if needed
        });
    }

    onTabChanged(event: MatTabChangeEvent) {
        this.selectedTabIndex = event.index;
        switch (this.selectedTabIndex) {
            case 0:
                this.tableDataDoctor = this.tableDataDoctor;
                break;
            case 1:
                this.tableDataReceptionist = this.tableDataReceptionist;
                break;
            case 2:
                this.tableDataNurse = this.tableDataNurse;
                break;
        }
    }

    onLogout() {
        this.authService.logout();
    }
}
