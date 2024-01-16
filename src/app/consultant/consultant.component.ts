import { Component } from '@angular/core';
@Component({
    selector: 'app-consultant',
    templateUrl: './consultant.component.html',
    styleUrl: './consultant.component.css',
})
export class ConsultantComponent {
    routes = [
        { title: 'Ward Map', icon: 'ward', link: 'ward_map' },
        { title: 'Appointments', icon: 'calendar_clock', link: 'appointments' },
        { title: 'Feed', icon: 'feed', link: 'feed' },
        { title: 'Forum', icon: 'forum', link: 'forum' },
    ];
    onLogout() {}
}
