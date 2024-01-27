import { Component } from '@angular/core';
import { Router } from '@angular/router';
import 'deep-chat';
import { AuthService } from '../auth.service';
@Component({
    selector: 'app-consultant',
    templateUrl: './consultant.component.html',
    styleUrl: './consultant.component.css',
})
export class ConsultantComponent {
    chat = false;
    routes = [
        { title: 'Ward Map', icon: 'ward', link: 'ward_map' },
        { title: 'Appointments', icon: 'calendar_clock', link: 'appointments' },
        { title: 'Feed', icon: 'feed', link: 'feed' },
    ];

    constructor(private authService: AuthService, private router: Router) {}

    onLogout() {
        this.authService.logout();
        this.router.navigate(['lobby']);
    }
}
