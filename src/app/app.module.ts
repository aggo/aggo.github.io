import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { FirebaseModule } from './shared/modules/firebase.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { APP_CONFIG, AppConfig } from './configs/app.config';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FirebaseModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [{provide: APP_CONFIG, useValue: AppConfig},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
