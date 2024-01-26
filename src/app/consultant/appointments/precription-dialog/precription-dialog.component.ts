import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CanvasComponent } from '../../../common/components/canvas/canvas.component';

@Component({
    selector: 'app-precription-dialog',
    templateUrl: './precription-dialog.component.html',
    styleUrl: './precription-dialog.component.css',
})
export class PrecriptionDialogComponent {
    pen_state = 'write';
    @ViewChild(CanvasComponent) canvasComponent: CanvasComponent;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public prescription: { appointment_id: string; prescription: string }
    ) {}

    setPenStatus(pen_state: string) {
        this.pen_state = pen_state;
    }

    onClearPad() {
        this.canvasComponent.clearPad();
        this.pen_state = 'write';
    }

    savePrescription() {
        this.canvasComponent.onSavePrescription();
    }
}
