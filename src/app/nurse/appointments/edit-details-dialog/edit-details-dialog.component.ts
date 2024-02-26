import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CanvasComponent } from '../../../material/components/canvas/canvas.component';

@Component({
  selector: 'app-edit-details-dialog',
  templateUrl: './edit-details-dialog.component.html',
  styleUrl: './edit-details-dialog.component.scss'
})
export class EditDetailsDialogComponent {
  @ViewChild(CanvasComponent) canvasComponent: CanvasComponent;

    constructor(
        @Inject(MAT_DIALOG_DATA)
      public editDetails: any
    ) {}
}
