import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CanvasComponent } from './components/canvas/canvas.component';
import { ChatComponent } from './components/chat/chat.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ElevateOnHoverDirective } from './directives/elevate-on-hover.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { SnackbarService } from './services/snackbar.service';

@NgModule({
    declarations: [
        CanvasComponent,
        ChatComponent,
        ElevateOnHoverDirective,
        SnackbarComponent,
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        ReactiveFormsModule,
        MatDividerModule,
    ],
    exports: [
        CanvasComponent,
        ChatComponent,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatGridListModule,
        MatCardModule,
        MatDialogModule,
        MatDividerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatRippleModule,
        MatInputModule,
        MatSnackBarModule,
        ElevateOnHoverDirective,
    ],
    providers: [SnackbarService],
})
export class MaterialModule {}
