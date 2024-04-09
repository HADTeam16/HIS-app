import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NurseService } from '../services/nurse.service';
import { map, take } from 'rxjs';

export const nurseGuard: CanActivateFn = (route, state) => {
    const nurseService = inject(NurseService);
    console.log('nurseService');
    const router = inject(Router);
    return nurseService.isHeadNurseSubject.pipe( take(1), map((res) => {
        console.log('res - ' + res);
        if (res) {
            console.log('res - ' + res);
            return true;
        } else {
            return router.createUrlTree(['/nurse']);;
        }
        })
    )
};
