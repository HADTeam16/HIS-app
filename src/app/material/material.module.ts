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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { SnackbarService } from './services/snackbar.service';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { SingleFileUploadComponent } from './components/single-file-upload/single-file-upload.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
    declarations: [
        CanvasComponent,
        ChatComponent,
        SnackbarComponent,
        DynamicTableComponent,
        SingleFileUploadComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatTableModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatSortModule,
        MatButtonModule,
    ],
    exports: [
        CanvasComponent,
        ChatComponent,
        DynamicTableComponent,
        SingleFileUploadComponent,
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
        MatStepperModule,
        MatSelectModule,
        MatTabsModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatChipsModule,
    ],
    providers: [SnackbarService],
})
export class MaterialModule {}
