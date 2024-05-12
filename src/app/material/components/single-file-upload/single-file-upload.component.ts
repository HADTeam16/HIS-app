import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-single-file-upload',
    templateUrl: './single-file-upload.component.html',
    styleUrl: './single-file-upload.component.scss',
})
export class SingleFileUploadComponent {
    @Input() label: string = 'Select a file';
    @Input() fileTypes: string[] = ['image/png', 'image/jpeg'];
    @Input() fileData: string = '';
    @Input() displayType: string = 'file';
    @Output() selected: EventEmitter<string> = new EventEmitter();

    onFileSelect() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.multiple = false;
        fileInput.style.display = 'none';
        fileInput.onchange = (event: Event) => {
            const files = (event.target as HTMLInputElement).files;
            if (files && files.length == 1) {
                if (this.fileTypes.includes(files[0].type)) {
                    this.convertFileToBase64(files[0]).then(
                        (res: string) => {
                            this.fileData = res;
                            this.label = files[0].name;
                            this.selected.emit(res);
                        },
                        (err) => {
                            this.selected.error('Unknown error' + err);
                        }
                    );
                } else {
                    this.selected.error('File type not supported!');
                }
            } else {
                this.selected.error('Select a single file!');
            }
        };
        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    }

    convertFileToBase64(file: File) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (ev: ProgressEvent<FileReader>) => {
                const base64 = ev.target?.result as string;
                resolve(base64);
            };
            reader.onerror = (ev: ProgressEvent<FileReader>) => {
                reject(ev.target?.error);
            };
            reader.readAsDataURL(file);
        });
    }
}
