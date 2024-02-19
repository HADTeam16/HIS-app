import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'removeUnderscore',
})
export class RemoveUnderscorePipe implements PipeTransform {
    transform(value: string): string {
        const words = value.split('_');
        let response = '';
        for (const word in words) {
            response = response+
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
        return response;
    }
}
