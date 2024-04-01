import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CanvasComponent } from '../../../material/components/canvas/canvas.component';
import { FormControl } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
    selector: 'app-precription-dialog',
    templateUrl: './precription-dialog.component.html',
    styleUrl: './precription-dialog.component.scss',
})
export class PrecriptionDialogComponent {
    needsWard: boolean = false;
    filesData: { name: string; base64: string }[] = [];
    prescription_state: 'canvas' | 'text' = 'canvas';
    pen_state: 'write' | 'erase' = 'write';
    @ViewChild(CanvasComponent) canvasComponent: CanvasComponent;
    textControl = new FormControl('');

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public prescription: { appointment_id: string; prescription: string }
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

    savePrescription() {
        if (this.prescription_state == 'canvas') {
            this.canvasComponent.onSavePrescription();
        } else if (this.prescription_state == 'text') {
            const utf8Encoded = new TextEncoder().encode(
                this.textControl.value
            );
            const base64Encoded = btoa(String.fromCharCode(...utf8Encoded));
            console.log(`data:text/plain;base64,${base64Encoded}`);
        }
    }
}
