import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Doctor, Patient } from '../../../models/user';
import { ReceptionistService } from '../../../services/receptionist.service';
import { BehaviorSubject, Subscription, finalize } from 'rxjs';
import { SnackbarService } from '../../../material/services/snackbar.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-book-appointment-dialog',
    templateUrl: './book-appointment-dialog.component.html',
    styleUrl: './book-appointment-dialog.component.scss',
})
export class BookAppointmentDialogComponent {
    getAllDoctorsSub: Subscription;
    doctors: Doctor[];
    doctorsLoading = true;
    specializations = new BehaviorSubject<string[]>([]);
    doctors_list = new BehaviorSubject<Doctor[]>([]);
    patientForm = new FormGroup({
        doctorId: new FormControl(0),
        purpose: new FormControl(''),
        temperature: new FormControl(''),
        bloodPressure: new FormControl(''),
        height: new FormControl(''),
        weight: new FormControl(''),
    });

    constructor(
        public dialogRef: MatDialogRef<BookAppointmentDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Patient,
        private receptionistService: ReceptionistService,
        private snackbarService: SnackbarService
    ) {
        this.getAllDoctorsSub = this.receptionistService
            .getAllDoctors()
            .pipe(
                finalize(() => {
                    this.doctorsLoading = false;
                })
            )
            .subscribe({
                next: (doctors) => {
                    this.doctors = doctors;
                    this.specializations.next([
                        ...new Set(
                            doctors.map((doctor) => doctor.specialization)
                        ),
                    ]);
                },
                error: (error) => {
                    this.snackbarService.openSnackBar(error);
                },
            });
    }

    onSelectSpecialization(specialization) {
        this.doctors_list.next(
            this.doctors.filter(
                (doctor) => doctor.specialization == specialization
            )
        );
        this.patientForm.controls['doctorId'].reset();
    }

    onBookAppointment() {
        this.receptionistService
            .bookAppointment({
                doctorId: this.patientForm.value.doctorId,
                patientId: this.data.id,
                purpose: this.patientForm.value.purpose,
                temperature: this.patientForm.value.temperature,
                bloodPressure: this.patientForm.value.bloodPressure,
                height: this.patientForm.value.height,
                weight: this.patientForm.value.weight,
            })
            .subscribe({
                next: (response: string) => {
                    this.snackbarService.openSnackBar(response);
                    this.dialogRef.close(true);
                },
                error: (err) => {
                    this.snackbarService.openSnackBar(err);
                    this.dialogRef.close(false);
                },
            });
    }

    ngOnDestroy() {
        this.getAllDoctorsSub.unsubscribe();
    }
}
