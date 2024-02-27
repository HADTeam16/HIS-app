import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent {
  chat = 'invisible';
  routes = [
    { title: 'Appointments', icon: 'calendar_clock', link: 'appointments' },
    { title: 'Manage Appointments', icon: 'ward', link: 'assign_ward' },
  ];

  constructor(private router: Router) {}

  onLogout() {
    this.router.navigate(['lobby']);
  }
}