import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {
    constructor() {}

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
