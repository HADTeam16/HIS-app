import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { WebsocketService } from './services/websocket.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'HIS-app';
    constructor(
        private authService: AuthService,
        private webSocketService: WebsocketService
    ) {}
    ngOnInit() {
        this.authService.autoLogin();
        this.webSocketService.connect();
    }
    ngOnDestroy() {
        this.webSocketService.disconnect();
    }

    bookAppointment(appointmentDetails) {
        this.webSocketService.sendAppointmentDetails(appointmentDetails);
    }
}
