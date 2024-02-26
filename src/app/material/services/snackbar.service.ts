import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarRef,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { Injectable } from '@angular/core';

@Injectable()
export class SnackbarService {
    constructor(private snackBar: MatSnackBar) {}

    openSnackBar(
        title: string,
        action = '',
        duration = 3000,
        hpos: MatSnackBarHorizontalPosition = 'center',
        vpos: MatSnackBarVerticalPosition = 'bottom'
    ): MatSnackBarRef<SnackbarComponent> {
        return this.snackBar.openFromComponent(SnackbarComponent, {
            data: { title: title, action: action },
            duration: duration,
            horizontalPosition: hpos,
            verticalPosition: vpos,
        });
    }
}
