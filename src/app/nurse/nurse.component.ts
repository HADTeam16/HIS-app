import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../material/services/snackbar.service';

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

  constructor(private router: Router, private authService : AuthService, private snackBarService : SnackbarService) {}

  onLogout() {
    this.authService.logout();
    this.snackBarService.openSnackBar("Logged Out Successfully");
  }
}