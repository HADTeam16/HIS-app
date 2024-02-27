import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Doctor, Patient } from '../../../models/user';
import { ReceptionistService } from '../../../services/receptionist.service';
import { BehaviorSubject, Subscription, finalize } from 'rxjs';
import { SnackbarService } from '../../../material/services/snackbar.service';

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
    selected_doctor_id: number | null = null;
    purpose: string;

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
        this.selected_doctor_id = null;
    }

    onSelectDoctor(selected_doctor_id: number) {
        this.selected_doctor_id = selected_doctor_id;
    }

    updatePurpose(purpose_input: EventTarget) {
        this.purpose = (<HTMLInputElement>purpose_input).value;
    }

    onBookAppointment() {
        this.receptionistService
            .bookAppointment({
                doctorId: this.selected_doctor_id,
                patientId: this.data.id,
                purpose: this.purpose,
            })
            .subscribe({
                next: (response: string) => {
                    console.log('Success', response);
                    this.snackbarService.openSnackBar(response);
                    this.dialogRef.close(true);
                },
                error: (err) => {
                    console.log('Error', err);
                    this.snackbarService.openSnackBar(err);
                    this.dialogRef.close(false);
                },
            });
    }

    ngOnDestroy() {
        this.getAllDoctorsSub.unsubscribe();
    }
}
