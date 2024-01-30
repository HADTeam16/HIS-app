import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    animations: [
        trigger('slideInOut', [
            state(
                'in',
                style({
                    transform: 'translateX(0%)',
                    opacity: 1,
                })
            ),
            state(
                'out',
                style({
                    transform: 'translateX(100%)',
                    opacity: 0,
                })
            ),
            transition('out => in', animate('300ms ease-in')),
            transition('in => out', animate('300ms ease-out')),
        ]),
    ],
})
export class LoginComponent {
    hoverState = ['out', 'out', 'out', 'out'];
    users = ['consultant', 'reception', 'admin', 'nurse'];
    tile_active = [false, false, false, false];
    loginForm = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
    });
    passHide = true;
    isLoading = false;

    constructor(private authService: AuthService, private router: Router) {}

    getIcon(user: string) {
        switch (user) {
            case 'consultant':
                return 'emergency';
            case 'reception':
                return 'badge';
            case 'admin':
                return 'engineering';
            case 'nurse':
                return 'vaccines';
            default:
                return 'engineering';
        }
    }

    getErrorMessage(i: string) {
        switch (i) {
            case 'email':
                if (this.loginForm.get('email').hasError('required')) {
                    return 'You must enter a value';
                } else if (this.loginForm.get('email').hasError('email')) {
                    return 'Not a valid email';
                } else {
                    return '';
                }
            case 'password':
                if (this.loginForm.get('password').hasError('required')) {
                    return 'You must enter a value';
                } else {
                    return '';
                }
            default:
                return '';
        }
    }

    tile_select(i: string) {
        switch (i) {
            case 'consultant':
                if (!this.tile_active[0]) {
                    this.passHide = true;
                }
                this.tile_active = [true, false, false, false];
                break;
            case 'reception':
                if (!this.tile_active[1]) {
                    this.passHide = true;
                }
                this.tile_active = [false, true, false, false];
                break;
            case 'admin':
                if (!this.tile_active[2]) {
                    this.passHide = true;
                }
                this.tile_active = [false, false, true, false];
                break;
            case 'nurse':
                if (!this.tile_active[3]) {
                    this.passHide = true;
                }
                this.tile_active = [false, false, false, true];
                break;
            default:
                this.tile_active = [false, false, false, false];
        }
    }

    onSubmit(user: string) {
        this.isLoading = true;
        this.router.navigate([user]);
        // this.authService
        //     .login(user)
        //     .then(
        //         () => {
        //             this.router.navigate([user]);
        //         },
        //         (error) => {
        //             alert(error);
        //         }
        //     )
        //     .finally(() => {
        //         this.isLoading = false;
        //     });
    }
}
