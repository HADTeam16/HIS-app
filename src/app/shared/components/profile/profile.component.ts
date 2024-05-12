import { Component } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent {
    user: User;
    constructor(private authService: AuthService) {
        this.user = this.authService.user.getValue();
    }
}
