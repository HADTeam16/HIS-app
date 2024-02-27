import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CanvasComponent } from '../../../material/components/canvas/canvas.component';
import { Patient } from '../../../models/user';

@Component({
  selector: 'app-allocate-ward-dialog',
  templateUrl: './allocate-ward-dialog.component.html',
  styleUrl: './allocate-ward-dialog.component.scss'
})
export class AllocateWardDialogComponent {
  @ViewChild(CanvasComponent) canvasComponent: CanvasComponent;

  Wards = [
    "W-01",
    "W-05",
    "W-07"
  ]
  
  onAssignWard() {
    this.dialogRef.close();
  }

    constructor(private dialogRef :MatDialogRef<AllocateWardDialogComponent>,
        @Inject(MAT_DIALOG_DATA)
      public allocateWard: Patient
    ) {}
}
