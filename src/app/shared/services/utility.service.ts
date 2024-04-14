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

    convertMultipleFilesToBase64(
        files: FileList
    ): Promise<{ name: string; base64: string }[]> {
        return new Promise((resolve, reject) => {
            const promises: Promise<{ name: string; base64: string }>[] =
                Array.from(files).map((file) => {
                    return new Promise<{ name: string; base64: string }>(
                        (resolve, reject) => {
                            const reader = new FileReader();
                            reader.onload = (
                                loadEvent: ProgressEvent<FileReader>
                            ) => {
                                const base64 = loadEvent.target
                                    ?.result as string;
                                resolve({ name: file.name, base64 });
                            };
                            reader.onerror = (errorEvent) =>
                                reject(errorEvent.target.error);
                            reader.readAsDataURL(file);
                        }
                    );
                });

            Promise.all(promises).then(
                (filesData) => resolve(filesData),
                (error) => {
                    reject(error);
                }
            );
        });
    }

    isToday(date: Date): boolean {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    }

    isPast(d1: Date): boolean {
        const year1 = d1.getFullYear();
        const month1 = d1.getMonth();
        const day1 = d1.getDate();

        const d2 = new Date();
        const year2 = d2.getFullYear();
        const month2 = d2.getMonth();
        const day2 = d2.getDate();

        if (year1 < year2) {
            return true;
        } else if (year1 === year2 && month1 < month2) {
            return true;
        } else if (year1 === year2 && month1 === month2 && day1 < day2) {
            return true;
        }

        return false;
    }
}
