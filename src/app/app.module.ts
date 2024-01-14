import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultantComponent } from './consultant/consultant.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WardMapComponent } from './consultant/ward-map/ward-map.component';
import { FeedComponent } from './consultant/feed/feed.component';
import { LobbyModule } from './lobby/lobby.module';

@NgModule({
    declarations: [
        AppComponent,
        ConsultantComponent,
        WardMapComponent,
        FeedComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LobbyModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
