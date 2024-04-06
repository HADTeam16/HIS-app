import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatDateFull',
})
export class FormatDateFullPipe implements PipeTransform {
    transform(value: string): string {
        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];

        const date = new Date(value);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        let hour = date.getHours();
        const minute = date.getMinutes();
        const ampm = hour >= 12 ? 'PM' : 'AM';

        hour = hour % 12;
        hour = hour ? hour : 12;
        const minuteStr = minute < 10 ? '0' + minute : minute;

        let daySuffix = 'th';
        if (day < 4 || day > 20) {
            switch (day % 10) {
                case 1:
                    daySuffix = 'st';
                    break;
                case 2:
                    daySuffix = 'nd';
                    break;
                case 3:
                    daySuffix = 'rd';
                    break;
            }
        }

        return `${day}${daySuffix} ${month}, ${year} - ${hour}:${minuteStr}${ampm}`;
    }
}
