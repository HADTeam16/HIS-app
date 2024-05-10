import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { BreakpointService } from './material/services/breakpoint.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    breakpointsub: Subscription;

    constructor(
        private authService: AuthService,
        private breakPointService: BreakpointService,
        private breakPointObserver: BreakpointObserver
    ) {}

    ngOnInit() {
        this.breakpointsub = this.breakPointObserver
            .observe([
                Breakpoints.TabletPortrait,
                Breakpoints.Small,
                Breakpoints.XSmall,
            ])
            .subscribe({
                next: (res) => {
                    this.breakPointService.setBreakPointStatus(res.matches);
                },
            });
        this.authService.autoLogin();
    }

    ngOnDestroy() {
        this.breakpointsub.unsubscribe();
    }
}
