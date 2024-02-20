import { Component } from '@angular/core';

@Component({
  selector: 'app-pharmacy-dialog',
  templateUrl: './pharmacy-dialog.component.html',
  styleUrl: './pharmacy-dialog.component.scss'
})
export class PharmacyDialogComponent {
  hide: boolean = true;

  openFileInput(): void {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  handleFileInput(event: any): void {
    const selectedFile = event.target.files.item(0);

    if (selectedFile) {
      console.log(`Selected file: ${selectedFile.name}`);
      // You may want to upload the file or perform other actions here
    }
  }
}
