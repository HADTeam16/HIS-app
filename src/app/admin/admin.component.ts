import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { AuthService } from '../services/auth.service';
import { Doctor, Nurse } from '../models/user';
import { AdminService } from '../services/admin.service';
import { finalize } from 'rxjs';
import { SnackbarService } from '../material/services/snackbar.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {

  isLoading = false;
  tableHeaders = ['id', 'firstName', 'lastName', 'dateOfBirth', 'email'];
  headerAlias = {
      id: 'User ID',
      firstName: 'First Name',
      lastName: 'Last Name',
      dateOfBirth: 'Date of Birth',
      email: 'Email'
  };

  tableDataDoctor: Doctor[] = [];
  tableDataNurse: Nurse[] = [];

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private adminService: AdminService,
    private snackbarService: SnackbarService,
  ) {
    this.getDoctors();
    this.getNurses();
  }
  
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
          console.log(this.tableDataDoctor);
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
          console.log(this.tableDataNurse);
        },
        error: (error) => {
          this.snackbarService.openSnackBar(error);
        },
      });
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  doctorDataSource = new MatTableDataSource<PeriodicElement>(DOCTOR_ELEMENT_DATA);
  receptionistDataSource = new MatTableDataSource<PeriodicElement>(RECEPTIONIST_ELEMENT_DATA);
  nurseDataSource = new MatTableDataSource<PeriodicElement>(NURSE_ELEMENT_DATA);

  @ViewChild('doctorPaginator') doctorPaginator: MatPaginator;
  @ViewChild('receptionistPaginator') receptionistPaginator: MatPaginator;
  @ViewChild('nursePaginator') nursePaginator: MatPaginator;

  selectedTabIndex = 0;

  toggleDoctorStatus(doctor: Doctor): void {
    this.isLoading = true;
    this.adminService.toggleDoctorById(doctor.id).pipe(finalize(() => { this.isLoading = false; }))
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
          const doctorIndex = this.tableDataDoctor.findIndex(el => el.id === doctor.id);
          if (doctorIndex !== -1) {
            this.tableDataDoctor[doctorIndex].isDisable = !this.tableDataDoctor[doctorIndex].isDisable;
          }
          console.log('After toggling:', this.tableDataDoctor);
        },
        error: (error) => {
          let errorMessage = 'An error occurred';
          if (error && error.error && typeof error.error === 'string') {
            errorMessage = error.error;
          }
          this.snackbarService.openSnackBar(errorMessage);
          // Revert the UI changes if any
          const doctorIndex = this.tableDataDoctor.findIndex(el => el.id === doctor.id);
          if (doctorIndex !== -1) {
            this.tableDataDoctor[doctorIndex].isDisable = !this.tableDataDoctor[doctorIndex].isDisable;
          }
        }
      });
  } 
  
  toggleNurseStatus(doctor: Doctor): void {
    this.isLoading = true;
    this.adminService.toggleDoctorById(doctor.id).pipe(finalize(() => { this.isLoading = false; }))
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
          const doctorIndex = this.tableDataDoctor.findIndex(el => el.id === doctor.id);
          if (doctorIndex !== -1) {
            this.tableDataDoctor[doctorIndex].isDisable = !this.tableDataDoctor[doctorIndex].isDisable;
          }
          console.log('After toggling:', this.tableDataDoctor);
        },
        error: (error) => {
          let errorMessage = 'An error occurred';
          if (error && error.error && typeof error.error === 'string') {
            errorMessage = error.error;
          }
          this.snackbarService.openSnackBar(errorMessage);
          // Revert the UI changes if any
          const doctorIndex = this.tableDataDoctor.findIndex(el => el.id === doctor.id);
          if (doctorIndex !== -1) {
            this.tableDataDoctor[doctorIndex].isDisable = !this.tableDataDoctor[doctorIndex].isDisable;
          }
        }
      });
  } 

  ngAfterViewInit() {
    this.doctorDataSource.paginator = this.doctorPaginator;
    this.receptionistDataSource.paginator = this.receptionistPaginator;
    this.nurseDataSource.paginator = this.nursePaginator;
  }

  onDoctorEdit(doctorId: number): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { tabIndex: this.selectedTabIndex, doctorId: doctorId },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle dialog closed if needed
    });
  }

  onNurseEdit(nurseId: number): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { tabIndex: this.selectedTabIndex, nurseId: nurseId },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle dialog closed if needed
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { tabIndex: this.selectedTabIndex },
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle dialog closed if needed
    });
  }

  applyFilter(value: string) {
    switch (this.selectedTabIndex) {
      case 0:
        this.doctorDataSource.filter = value;
        break;
      case 1:
        this.receptionistDataSource.filter = value;
        break;
      case 2:
        this.nurseDataSource.filter = value;
        break;
    }
  }  

  onTabChanged(event: any) {
    this.selectedTabIndex = event.index;
  }

  onLogout() {
    this.authService.logout();
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const DOCTOR_ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

const RECEPTIONIST_ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

const PHARMACY_ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

const NURSE_ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];