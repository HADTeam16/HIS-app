import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
    icons = [
        'ward',
        'forum',
        'calendar_clock',
        'feed',
        'chat_filled',
        'chat_outlined',
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
