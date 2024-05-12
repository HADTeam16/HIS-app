import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../../shared/models/user';
import { AdminService } from '../admin.service';
import { SnackbarService } from '../../material/services/snackbar.service';
import { Subscription } from 'rxjs';
import { UtilityService } from '../../shared/services/utility.service';

@Component({
    selector: 'app-doctor-dialog',
    templateUrl: './doctor-dialog.component.html',
    styleUrls: ['./doctor-dialog.component.scss'],
})
export class DoctorDialogComponent {
    doctorForm: FormGroup;
    getAllDoctorsSub: Subscription;
    doctors: Doctor[];
    doctorsLoading = true;
    selectedFile: File | undefined;
    base64Image: string | undefined;
    selectedFileName: string | undefined;
    fileLabelMappings = {
        profile: ['Profile picture selected', 'Select profile picture'],
        certification: [
            'Board certification selected',
            'Select board certification',
        ],
        cv: ['CV selected', 'Select CV'],
        degree: ['Medical degree selected', 'Select medical degree'],
        drugs: ['Drug screening selected', 'Select drug screening'],
    };
    filesUploadedFlags = [false, false, false, false, false];
    @Output() doctorSelected = new EventEmitter<Doctor>();

    constructor(
        private formBuilder: FormBuilder,
        private adminService: AdminService,
        private snackbarService: SnackbarService,
    ) {
        this.doctorForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            middleName: [''],
            lastName: ['', Validators.required],
            gender: ['', Validators.required],
            dateOfBirth: [new Date('2000-01-01'), Validators.required],
            country: ['', Validators.required],
            state: ['', Validators.required],
            city: ['', Validators.required],
            addressLine1: ['', Validators.required],
            addressLine2: [null],
            landmark: [null],
            pinCode: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
            contact: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
            email: ['', [Validators.required, Validators.email]],
            profilePicture: ['', Validators.required],
            emergencyContactName: ['', Validators.required],
            emergencyContactNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
            role: ['doctor'],
            medicalLicenseNumber: ['', Validators.required],
            specialization: ['', Validators.required],
            boardCertification: ['', Validators.required],
            experience: ['', Validators.required],
            medicalDegree: ['', Validators.required],
            cv: ['', Validators.required],
            drugScreeningResult: ['', Validators.required],
            workStart: ['', Validators.required],
            workEnd: ['', Validators.required],
            disable: false,
        });
    }

    onProfilePictureSelected(event: string) {
        this.doctorForm.controls['profilePicture'].setValue(event);
        this.filesUploadedFlags[0] = true;
    }

    onBoardCertificationSelected(event: string) {
        console.log(event);
        this.doctorForm.controls['boardCertification'].setValue(event);
        this.filesUploadedFlags[1] = true;
    }

    onCVSelected(event: string) {
        this.doctorForm.controls['cv'].setValue(event);
        this.filesUploadedFlags[2] = true;
    }

    onMedicalDegreeSelected(event: string) {
        this.doctorForm.controls['medicalDegree'].setValue(event);
        this.filesUploadedFlags[3] = true;
    }

    onDrugScreeningResultSelected(event: string) {
        this.doctorForm.controls['drugScreeningResult'].setValue(event);
        this.filesUploadedFlags[4] = true;
    }

    onRegisterDoctor() {
        const formData = this.doctorForm.value;
        console.log(formData);
        const doc = {
            id: formData.id,
            userName: formData.userName,
            password: formData.password,
            firstName: formData.firstName,
            middleName: formData.middleName,
            lastName: formData.lastName,
            gender: formData.gender,
            dateOfBirth: formData.dateOfBirth,
            country: formData.country,
            state: formData.state,
            city: formData.city,
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2,
            landmark: formData.landmark,
            pinCode: formData.pinCode,
            contact: formData.contact,
            email: formData.email,
            profilePicture: formData.profilePicture,
            emergencyContactName: formData.emergencyContactName,
            emergencyContactNumber: formData.emergencyContactNumber,
            role: formData.role,
            medicalLicenseNumber: formData.medicalLicenseNumber,
            specialization: formData.specialization,
            boardCertification: formData.boardCertification,
            medicalDegree: formData.medicalDegree,
            cv: formData.cv,
            drugScreeningResult: formData.drugScreeningResult,
            workStart: formData.workStart,
            workEnd: formData.workEnd,
            disable: formData.disable,
        };
        this.adminService
            .registerDoctor(doc)
            .then(
                 (response: string) => {
                    this.snackbarService.openSnackBar(response);
                    this.doctorSelected.emit(doc);
                },
                 (err) => {
                    this.snackbarService.openSnackBar(err);
                },
            );
    }
}
