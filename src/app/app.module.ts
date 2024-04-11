import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';
import { WebsocketService } from './services/websocket.service';
import { UtilityService } from './services/utility.service';
import { NurseService } from './services/nurse.service';
import { OtpService } from './services/otp.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
    ],
    providers: [
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        WebsocketService,
        UtilityService,
        OtpService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    icons = [
        'ward',
        'calendar_clock',
        'chat_filled',
        'chat_outlined',
        'patient_list',
        'person_add',
        'e911_emergency_filled',
        'e911_emergency_outline',
        'arrow_back',
    ];

    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) {
        this.loadIcons(this.icons, '../../assets/icons');
    }

    loadIcons(iconKeys: string[], iconUrl: string): void {
        iconKeys.forEach((key) => {
            this.matIconRegistry.addSvgIcon(
                key,
                this.domSanitizer.bypassSecurityTrustResourceUrl(
                    `${iconUrl}/${key}.svg`
                )
            );
        });
    }
}
