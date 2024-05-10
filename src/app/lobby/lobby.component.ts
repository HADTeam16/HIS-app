import { Component } from '@angular/core';
import { BreakpointService } from '../material/services/breakpoint.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
})
export class LobbyComponent {
    isTablet: boolean;
    bpsub: Subscription;

    constructor(private breakPointService: BreakpointService) {}

    ngOnInit() {
        this.bpsub = this.breakPointService.isTablet.subscribe((res) => {
            this.isTablet = res;
        });
    }

    ngOnDestroy() {
        this.bpsub.unsubscribe();
    }
}
