import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-consultant',
    templateUrl: './consultant.component.html',
    styleUrl: './consultant.component.css',
})
export class ConsultantComponent {
    chat = 'invisible';
    routes = [
        { title: 'Ward Map', icon: 'ward', link: 'ward_map' },
        { title: 'Appointments', icon: 'calendar_clock', link: 'appointments' },
    ];

    constructor(private router: Router) {}

    onLogout() {
        this.router.navigate(['lobby']);
    }
}