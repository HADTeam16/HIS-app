import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-search-input',
    template: `
        <mat-form-field>
            <input matInput placeholder="Search" (input)="onInput($event)" />
        </mat-form-field>
    `,
    styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
    @Output() searchChanged = new EventEmitter<string>();

    onInput(event: any) {
        const value = (event.target as HTMLInputElement).value
            .trim()
            .toLowerCase();
        this.searchChanged.emit(value);
    }
}
