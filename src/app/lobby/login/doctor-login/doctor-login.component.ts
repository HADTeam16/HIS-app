import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BreakpointService } from '../../../material/services/breakpoint.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-doctor-login',
    templateUrl: './doctor-login.component.html',
    styleUrl: './doctor-login.component.scss',
})
export class DoctorLoginComponent {
    @Input('form') doctorloginForm: FormGroup;
    @Output() doctorLogin = new EventEmitter<{
        username: string;
        password: string;
    }>();
    @Output() forgotPassword = new EventEmitter();

    onSubmit() {
        this.doctorLogin.emit(this.doctorloginForm.getRawValue());
    }

    onForgotPassword() {
        this.forgotPassword.emit();
    }
}
