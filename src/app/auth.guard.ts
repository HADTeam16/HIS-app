import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const current_role = route.url.toString();
    return authService.user.pipe(
        take(1),
        map((user) => {
            if (!!user && user.role == current_role) return true;
            return router.createUrlTree(['/lobby']);
        })
    );
};
