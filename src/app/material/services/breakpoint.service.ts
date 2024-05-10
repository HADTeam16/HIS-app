import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BreakpointService {
    isTablet = new BehaviorSubject<boolean>(false);

    setBreakPointStatus(status: boolean) {
        this.isTablet.next(status);
    }
}
