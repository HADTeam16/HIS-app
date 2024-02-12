import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-reception',
    templateUrl: './reception.component.html',
    styleUrl: './reception.component.css',
})
export class ReceptionComponent {
    routes = [
        { title: 'Patients', icon: 'patient_list', link: 'patients' },
        { title: 'Add Patient', icon: 'person_add', link: 'add-patient' },
    ];

    constructor(private router: Router) {}

    onLogout() {
        this.router.navigate(['lobby']);
    }
}
