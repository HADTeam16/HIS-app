import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CanvasComponent } from '../../../material/components/canvas/canvas.component';
import { FormControl } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DoctorService } from '../../doctor.service';
import { SnackbarService } from '../../../material/services/snackbar.service';

@Component({
    selector: 'app-prescription-dialog',
    templateUrl: './prescription-dialog.component.html',
})
export class PrescriptionDialogComponent {
    needsWard: boolean = false;
    filesData: { name: string; base64: string }[] = [];
    prescription_state: 'canvas' | 'text' = 'canvas';
    pen_state: 'write' | 'erase' = 'write';
    @ViewChild(CanvasComponent) canvasComponent: CanvasComponent;
    textControl = new FormControl('');

    constructor(
        public dialogRef: MatDialogRef<PrescriptionDialogComponent>,
        @Inject(MAT_DIALOG_DATA)
        public prescription: { appointment_id: number; prescription: string },
        private doctorService: DoctorService,
        private snackbarService: SnackbarService
    ) {}

    openFileSelector() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.multiple = true;
        fileInput.style.display = 'none';

        fileInput.onchange = (event: Event) => {
            const files = (event.target as HTMLInputElement).files;
            if (files) {
                this.handleFiles(files);
            }
        };

        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    }

    handleFiles(files: FileList) {
        this.filesData = [];
        Array.from(files).forEach((file) => {
            const reader = new FileReader();
            reader.onload = (loadEvent: ProgressEvent<FileReader>) => {
                const base64 = loadEvent.target?.result as string;
                this.filesData.push({ name: file.name, base64 });
            };
            reader.readAsDataURL(file);
        });
    }

    clearRecords() {
        this.filesData = [];
    }

    onAssignWardToggle(event: MatSlideToggleChange) {
        this.needsWard = event.checked;
    }

    setPrescriptionStatus(prescription_state: 'canvas' | 'text') {
        this.prescription_state = prescription_state;
        this.onClearPad();
        this.setPenStatus('write');
    }

    setPenStatus(pen_state: 'write' | 'erase') {
        this.pen_state = pen_state;
    }

    onClearPad() {
        if (this.prescription_state == 'canvas' && this.canvasComponent) {
            this.canvasComponent.clearPad();
            this.pen_state = 'write';
        } else if (this.prescription_state == 'text') {
            this.textControl.reset();
        }
    }

    finishAppointment() {
        let prescription;
        if (this.prescription_state == 'canvas') {
            prescription = this.canvasComponent.onSavePrescription();
        } else if (this.prescription_state == 'text') {
            // const utf8Encoded = new TextEncoder().encode(
            //     this.textControl.value
            // );
            // const base64Encoded = btoa(String.fromCharCode(...utf8Encoded));
            // prescription = `data:text/plain;base64,${base64Encoded}`;
            prescription = this.convertTextToImage(this.textControl.value);
        }
        const records = this.filesData.map((el) => el.base64);
        this.doctorService
            .addAppointmentData(
                this.prescription.appointment_id,
                prescription,
                records,
                this.needsWard
            )
            .then(
                (res) => {
                    this.snackbarService.openSnackBar(
                        this.needsWard
                            ? 'Appointment data uploaded and patient added to ward queue'
                            : 'Appointment data uploaded'
                    );
                    this.dialogRef.close();
                },
                (err) => {
                    this.snackbarService.openSnackBar(err);
                }
            );
    }

    convertTextToImage(prescription_text: string) {
        const canvas: HTMLCanvasElement = document.createElement('canvas');

        // Set canvas size and clear previous content
        canvas.width = 750; // Width of the canvas/image
        canvas.height = 1000; // Height of the canvas/image
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set text properties
        ctx!.font = '18px Arial';
        ctx!.fillStyle = '#000';

        // Split the input text by new lines
        const lines = prescription_text.split('\n');

        let startY = 20; // Y start position of the first line
        const lineHeight = 20; // Line height

        // Draw each line on the canvas
        lines.forEach((line, index) => {
            ctx!.fillText(line, 10, startY + lineHeight * index);
        });

        // Convert canvas to image URL
        prescription_text = canvas.toDataURL('image/png');
        return prescription_text;
    }
}
