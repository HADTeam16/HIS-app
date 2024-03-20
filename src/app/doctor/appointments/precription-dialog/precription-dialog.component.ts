import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CanvasComponent } from '../../../material/components/canvas/canvas.component';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-precription-dialog',
    templateUrl: './precription-dialog.component.html',
    styleUrl: './precription-dialog.component.css',
})
export class PrecriptionDialogComponent {
    prescription_state: 'canvas' | 'text' = 'canvas';
    pen_state: 'write' | 'erase' = 'write';
    @ViewChild(CanvasComponent) canvasComponent: CanvasComponent;
    textControl = new FormControl('');

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public prescription: { appointment_id: string; prescription: string }
    ) {}

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
        this.canvasComponent.onSavePrescription();
    }
}
