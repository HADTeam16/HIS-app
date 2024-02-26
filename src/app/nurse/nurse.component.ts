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
    { title: 'Ward Map', icon: 'ward', link: 'ward_map' },
    { title: 'Appointments', icon: 'calendar_clock', link: 'appointments' },
  ];

  constructor(private router: Router) {}

  onLogout() {
    this.router.navigate(['lobby']);
  }
}