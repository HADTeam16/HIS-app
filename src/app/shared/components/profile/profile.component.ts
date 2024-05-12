import { Component } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../../material/services/snackbar.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent {
    user: User;
    isLoading = false;
    constructor(private authService: AuthService, private snackbarService : SnackbarService) {
        this.user = this.authService.user.getValue();
    }
    updateProfileImage(data: string) {
        this.isLoading = true;
        this.authService
            .changeProfileImage(data)
            .then(
                (response: string) => {
                    this.snackbarService.openSnackBar(response);
                },
                (error: string) => {
                    this.snackbarService.openSnackBar(error);
                }
            )
            .finally(() => {
                this.isLoading = false;
            });
    }
}
