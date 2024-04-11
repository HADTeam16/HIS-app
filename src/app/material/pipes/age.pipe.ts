import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'age',
})
export class AgePipe implements PipeTransform {
    transform(dateOfBirth: string): number {
        if (!dateOfBirth) return null;

        const dob = new Date(dateOfBirth);
        const today = new Date();

        let age = today.getFullYear() - dob.getFullYear();

        const monthDiff = today.getMonth() - dob.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < dob.getDate())
        ) {
            age--;
        }

        return age;
    }
}
