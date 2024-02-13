import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-doctor',
    templateUrl: './doctor.component.html',
    styleUrl: './doctor.component.scss',
})
export class DoctorComponent {
    chat = 'invisible';
    routes = [
        { title: 'Appointments', icon: 'calendar_clock', link: 'appointments' },
        { title: 'Ward Map', icon: 'ward', link: 'ward_map' },
    ];

    constructor(private router: Router) {}

    onLogout() {
        this.router.navigate(['lobby']);
    }
}
