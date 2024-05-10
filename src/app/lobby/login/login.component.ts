import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { SnackbarService } from '../../material/services/snackbar.service';
import { finalize, Subscription } from 'rxjs';
import { ForgetPasswordComponent } from './password-reset/forget-password-dialog.component';
import { BreakpointService } from '../../material/services/breakpoint.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    users = ['doctor', 'receptionist', 'admin', 'nurse'];
    tile_active = [false, false, false, false];
    loginForm = new FormGroup({
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
    });
    passHide = true;
    isLoading = false;
    isTablet = false;
    bpsub: Subscription;

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private authService: AuthService,
        private snackbarService: SnackbarService,
        private breakPointService: BreakpointService
    ) {}

    ngOnInit() {
        this.bpsub = this.breakPointService.isTablet.subscribe((res) => {
            this.isTablet = res;
        });
    }

    getIcon(user: string) {
        switch (user) {
            case 'doctor':
                return 'emergency';
            case 'receptionist':
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
            case 'username':
                if (this.loginForm.get('username').hasError('required')) {
                    return 'You must enter a value';
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
            case 'doctor':
                this.passHide = true;
                if (this.tile_active[0]) {
                    this.tile_active = [false, false, false, false];
                } else {
                    this.tile_active = [true, false, false, false];
                }
                break;
            case 'receptionist':
                this.passHide = true;
                if (this.tile_active[1]) {
                    this.tile_active = [false, false, false, false];
                } else {
                    this.tile_active = [false, true, false, false];
                }
                break;
            case 'admin':
                this.passHide = true;
                if (this.tile_active[2]) {
                    this.tile_active = [false, false, false, false];
                } else {
                    this.tile_active = [false, false, true, false];
                }
                break;
            case 'nurse':
                this.passHide = true;
                if (this.tile_active[3]) {
                    this.tile_active = [false, false, false, false];
                } else {
                    this.tile_active = [false, false, false, true];
                }
                break;
            default:
                this.passHide = true;
                this.tile_active = [false, false, false, false];
                break;
        }
    }

    onSubmit(user: string) {
        this.isLoading = true;
        this.authService
            .login(
                this.loginForm.value.username,
                this.loginForm.value.password,
                user
            )
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                })
            )
            .subscribe({
                next: (response) => {
                    this.snackbarService.openSnackBar(response['message']);
                    if (response['message'] == 'Login Success') {
                        this.router.navigate([user]);
                    }
                },
                error: (error) => {
                    this.snackbarService.openSnackBar(error.error.message);
                },
            });
    }

    forgotPassword() {
        this.dialog.open(ForgetPasswordComponent);
    }

    ngDestroy() {
        this.bpsub.unsubscribe();
    }
}
