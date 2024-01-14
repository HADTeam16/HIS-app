import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatRipple } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    users: string[];
    tile_active: boolean[];
    loginForm: FormGroup;
    passHide: boolean;
    isLoading: boolean;
    rippleArr: MatRipple[];
    @ViewChildren(MatRipple) ripple: QueryList<MatRipple>;

    constructor(private authService: AuthService, private router: Router) {
        this.users = ['consultant', 'nurse', 'patient', 'staff'];
        this.tile_active = [false, false, false, false];
        this.passHide = true;
        this.isLoading = false;
    }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl(null, Validators.required),
        });
    }

    ngAfterViewInit() {
        this.rippleArr = this.ripple.toArray();
    }

    launchRipple(i: number) {
        const rippleRef = this.rippleArr[i].launch({ centered: true });
        rippleRef.fadeOut();
    }

    getIcon(user: string) {
        switch (user) {
            case 'consultant':
                return 'emergency';
            case 'nurse':
                return 'medical_services';
            case 'patient':
                return 'personal_injury';
            case 'staff':
                return 'emergency';
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
                    this.launchRipple(0);
                    this.passHide = true;
                }
                this.tile_active = [true, false, false, false];
                break;
            case 'nurse':
                if (!this.tile_active[1]) {
                    this.launchRipple(1);
                    this.passHide = true;
                }
                this.tile_active = [false, true, false, false];
                break;
            case 'patient':
                if (!this.tile_active[2]) {
                    this.launchRipple(2);
                    this.passHide = true;
                }
                this.tile_active = [false, false, true, false];
                break;
            case 'staff':
                if (!this.tile_active[3]) {
                    this.launchRipple(3);
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
        this.authService
            .login(user)
            .then(
                () => {
                    this.router.navigate([user]);
                },
                (error) => {
                    alert(error);
                }
            )
            .finally(() => {
                this.isLoading = false;
            });
    }
}
