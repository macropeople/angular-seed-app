import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { LoginModalComponent } from './login-modal/login-modal.component';
import { DataComponent } from './data/data.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ClarityModule } from '@clr/angular';

@NgModule({
  declarations: [AppComponent, LoginModalComponent, DataComponent, HomePageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ClarityModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoginModalComponent]
})
export class AppModule {}
