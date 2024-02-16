import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
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
