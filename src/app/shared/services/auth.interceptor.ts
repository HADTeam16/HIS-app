import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (this.authService.isAuthenticated()) {
            let authToken = this.authService.getAuthorizationToken();
            const authReq = req.clone({
                headers: req.headers.set('Authorization', "Bearer "+authToken),
            });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}
